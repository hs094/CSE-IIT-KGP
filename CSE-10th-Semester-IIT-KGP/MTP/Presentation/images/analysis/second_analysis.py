#!/usr/bin/env python3
# Second analysis of the edosthi dataset - Advanced NLP Analysis

import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import re
import string
from collections import Counter, defaultdict
from tqdm import tqdm
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.util import ngrams
import textstat
import spacy
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation, TruncatedSVD
from sklearn.cluster import KMeans
from sklearn.manifold import TSNE
from sklearn.metrics.pairwise import cosine_similarity
from textblob import TextBlob
from wordcloud import WordCloud
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import gensim
from gensim import corpora
import warnings
import matplotlib.cm as cm

# Ignore warnings
warnings.filterwarnings('ignore')

# Set style for plots
plt.style.use('ggplot')
sns.set(font_scale=1.2)
sns.set_style("whitegrid")

# Create output directory for plots
os.makedirs('plots_advanced', exist_ok=True)

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Initialize NLTK tools
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
sid = SentimentIntensityAnalyzer()

# Function to preprocess text
def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Tokenize
    tokens = word_tokenize(text)
    # Remove stopwords
    tokens = [token for token in tokens if token not in stop_words]
    # Lemmatize
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return tokens

# Function to extract all messages from a conversation
def extract_messages(conversation):
    messages = []
    for message in conversation['messages']:
        messages.append({
            'role': message['role'],
            'content': message['content']
        })
    return messages

# Load the dataset
print("Loading dataset...")
with open('edosthi_dataset.json', 'r') as f:
    data = json.load(f)

print(f"Dataset loaded. Contains {len(data)} conversations.")

# Create a DataFrame for conversations
conversations_df = pd.DataFrame(data)

# Extract all messages into a flat structure
print("\nExtracting messages...")
all_messages = []
for idx, conversation in tqdm(conversations_df.iterrows(), total=len(conversations_df)):
    messages = extract_messages(conversation)
    for i, message in enumerate(messages):
        message['conversation_id'] = idx
        message['message_position'] = i + 1
        message['metadata'] = conversation['metadata']
        all_messages.append(message)

messages_df = pd.DataFrame(all_messages)
print(f"Total messages extracted: {len(messages_df)}")

# 1. Advanced Sentiment Analysis
print("\nPerforming advanced sentiment analysis...")
# Calculate sentiment using TextBlob for comparison
messages_df['textblob_polarity'] = messages_df['content'].apply(lambda x: TextBlob(x).sentiment.polarity)
messages_df['textblob_subjectivity'] = messages_df['content'].apply(lambda x: TextBlob(x).sentiment.subjectivity)

# Calculate VADER sentiment for comparison
messages_df['vader_compound'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['compound'])

# Plot comparison of sentiment analysis methods
plt.figure(figsize=(12, 6))
plt.scatter(messages_df['textblob_polarity'], messages_df['vader_compound'], alpha=0.5, c=messages_df['role'].map({'provider': 'blue', 'patient': 'red'}))
plt.title('Comparison of Sentiment Analysis Methods')
plt.xlabel('TextBlob Polarity')
plt.ylabel('VADER Compound Score')
plt.grid(True)
plt.colorbar(plt.cm.ScalarMappable(cmap='coolwarm'), label='Role')
plt.savefig('plots_advanced/sentiment_comparison.png')
plt.close()

# Plot sentiment progression within conversations
# Group by conversation_id and calculate average sentiment
conversation_sentiment = messages_df.groupby(['conversation_id', 'message_position']).agg({
    'vader_compound': 'mean',
    'textblob_polarity': 'mean'
}).reset_index()

# Sample 10 random conversations for visualization
sampled_conversations = np.random.choice(conversation_sentiment['conversation_id'].unique(), 10, replace=False)
sampled_sentiment = conversation_sentiment[conversation_sentiment['conversation_id'].isin(sampled_conversations)]

plt.figure(figsize=(14, 8))
for conv_id in sampled_conversations:
    conv_data = sampled_sentiment[sampled_sentiment['conversation_id'] == conv_id]
    plt.plot(conv_data['message_position'], conv_data['vader_compound'], marker='o', label=f'Conversation {conv_id}')

plt.title('Sentiment Progression in Sample Conversations')
plt.xlabel('Message Position')
plt.ylabel('VADER Compound Score')
plt.grid(True)
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.tight_layout()
plt.savefig('plots_advanced/sentiment_progression_sample.png')
plt.close()

# 2. Subjectivity Analysis
print("\nAnalyzing subjectivity...")
# Plot subjectivity distribution by role
plt.figure(figsize=(12, 6))
sns.boxplot(data=messages_df, x='role', y='textblob_subjectivity')
plt.title('Subjectivity Distribution by Role')
plt.xlabel('Role')
plt.ylabel('Subjectivity Score')
plt.savefig('plots_advanced/subjectivity_distribution.png')
plt.close()

# Plot subjectivity vs. message position
subjectivity_by_position = messages_df.groupby(['message_position', 'role'])['textblob_subjectivity'].mean().reset_index()
subjectivity_by_position = subjectivity_by_position[subjectivity_by_position['message_position'] <= 20]  # Limit to first 20 positions

plt.figure(figsize=(14, 7))
for role in subjectivity_by_position['role'].unique():
    role_data = subjectivity_by_position[subjectivity_by_position['role'] == role]
    plt.plot(role_data['message_position'], role_data['textblob_subjectivity'], marker='o', label=role)

plt.title('Average Subjectivity Progression in Conversations')
plt.xlabel('Message Position in Conversation')
plt.ylabel('Average Subjectivity Score')
plt.legend()
plt.grid(True)
plt.savefig('plots_advanced/subjectivity_progression.png')
plt.close()

# 3. Part-of-Speech Analysis
print("\nPerforming part-of-speech analysis...")
# Sample a subset of messages for POS analysis
pos_sample = messages_df.sample(min(500, len(messages_df)))
pos_counts = defaultdict(Counter)

for _, row in tqdm(pos_sample.iterrows(), total=len(pos_sample)):
    doc = nlp(row['content'])
    for token in doc:
        pos_counts[row['role']][token.pos_] += 1

# Convert to DataFrame for plotting
pos_data = []
for role, counts in pos_counts.items():
    total = sum(counts.values())
    for pos, count in counts.items():
        pos_data.append({
            'role': role,
            'pos': pos,
            'count': count,
            'percentage': (count / total) * 100
        })

pos_df = pd.DataFrame(pos_data)

# Plot POS distribution by role
plt.figure(figsize=(14, 8))
sns.barplot(data=pos_df, x='pos', y='percentage', hue='role')
plt.title('Part-of-Speech Distribution by Role')
plt.xlabel('Part of Speech')
plt.ylabel('Percentage')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('plots_advanced/pos_distribution.png')
plt.close()

# 4. Conversation Complexity Analysis
print("\nAnalyzing conversation complexity...")
# Calculate complexity metrics
messages_df['avg_word_length'] = messages_df['content'].apply(lambda x: np.mean([len(word) for word in x.split()]) if len(x.split()) > 0 else 0)
messages_df['unique_words_ratio'] = messages_df.apply(lambda row: len(set(row['content'].lower().split())) / len(row['content'].split()) if len(row['content'].split()) > 0 else 0, axis=1)

# Plot complexity metrics by role
plt.figure(figsize=(12, 6))
sns.boxplot(data=messages_df, x='role', y='avg_word_length')
plt.title('Average Word Length by Role')
plt.xlabel('Role')
plt.ylabel('Average Word Length')
plt.savefig('plots_advanced/avg_word_length.png')
plt.close()

plt.figure(figsize=(12, 6))
sns.boxplot(data=messages_df, x='role', y='unique_words_ratio')
plt.title('Unique Words Ratio by Role')
plt.xlabel('Role')
plt.ylabel('Unique Words Ratio')
plt.savefig('plots_advanced/unique_words_ratio.png')
plt.close()

# 5. TF-IDF Analysis and Clustering
print("\nPerforming TF-IDF analysis and clustering...")
# Prepare corpus for TF-IDF
role_texts = {}
for role in messages_df['role'].unique():
    role_texts[role] = messages_df[messages_df['role'] == role]['content'].tolist()

# Combine all texts
all_texts = messages_df['content'].tolist()

# Create TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(all_texts)

# Get feature names
feature_names = tfidf_vectorizer.get_feature_names_out()

# Get top TF-IDF terms for each role
role_tfidf = {}
for role in messages_df['role'].unique():
    role_indices = messages_df[messages_df['role'] == role].index
    role_tfidf_matrix = tfidf_matrix[role_indices]
    role_tfidf_sum = role_tfidf_matrix.sum(axis=0)
    role_tfidf_scores = [(feature_names[i], role_tfidf_sum[0, i]) for i in range(len(feature_names))]
    role_tfidf[role] = sorted(role_tfidf_scores, key=lambda x: x[1], reverse=True)[:20]

# Plot top TF-IDF terms for each role
for role, tfidf_scores in role_tfidf.items():
    terms, scores = zip(*tfidf_scores)
    plt.figure(figsize=(12, 6))
    sns.barplot(x=list(scores), y=list(terms))
    plt.title(f'Top 20 TF-IDF Terms for {role.title()} Role')
    plt.xlabel('TF-IDF Score')
    plt.ylabel('Term')
    plt.tight_layout()
    plt.savefig(f'plots_advanced/tfidf_top_terms_{role}.png')
    plt.close()

# Perform K-means clustering on TF-IDF matrix
num_clusters = 5
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
clusters = kmeans.fit_predict(tfidf_matrix)

# Add cluster labels to DataFrame
messages_df['cluster'] = clusters

# Perform t-SNE for visualization
print("\nPerforming t-SNE dimensionality reduction...")
# Use a sample for t-SNE to make it faster
sample_indices = np.random.choice(tfidf_matrix.shape[0], min(1000, tfidf_matrix.shape[0]), replace=False)
sample_tfidf = tfidf_matrix[sample_indices]
sample_clusters = clusters[sample_indices]
sample_roles = messages_df.iloc[sample_indices]['role'].values

# Apply t-SNE
tsne = TSNE(n_components=2, random_state=42, perplexity=30)
tsne_results = tsne.fit_transform(sample_tfidf.toarray())

# Plot t-SNE results colored by cluster
plt.figure(figsize=(12, 10))
scatter = plt.scatter(tsne_results[:, 0], tsne_results[:, 1], c=sample_clusters, cmap='viridis', alpha=0.6)
plt.colorbar(scatter, label='Cluster')
plt.title('t-SNE Visualization of Message Clusters')
plt.xlabel('t-SNE Dimension 1')
plt.ylabel('t-SNE Dimension 2')
plt.savefig('plots_advanced/tsne_clusters.png')
plt.close()

# Plot t-SNE results colored by role
plt.figure(figsize=(12, 10))
role_colors = {'provider': 'blue', 'patient': 'red'}
for role in np.unique(sample_roles):
    role_indices = np.where(sample_roles == role)
    plt.scatter(tsne_results[role_indices, 0], tsne_results[role_indices, 1], 
                c=role_colors[role], label=role, alpha=0.6)
plt.title('t-SNE Visualization of Messages by Role')
plt.xlabel('t-SNE Dimension 1')
plt.ylabel('t-SNE Dimension 2')
plt.legend()
plt.savefig('plots_advanced/tsne_roles.png')
plt.close()

# 6. Conversation Flow Network Analysis
print("\nAnalyzing conversation flow networks...")
# Create a transition matrix for each conversation
conversation_transitions = {}
for conv_id in messages_df['conversation_id'].unique():
    conv_messages = messages_df[messages_df['conversation_id'] == conv_id].sort_values('message_position')
    if len(conv_messages) < 2:
        continue
    
    # Create transitions
    transitions = []
    for i in range(len(conv_messages) - 1):
        current_role = conv_messages.iloc[i]['role']
        next_role = conv_messages.iloc[i + 1]['role']
        transitions.append((current_role, next_role))
    
    # Count transitions
    transition_counts = Counter(transitions)
    conversation_transitions[conv_id] = transition_counts

# Calculate average transitions per conversation
avg_transitions = Counter()
for transitions in conversation_transitions.values():
    avg_transitions.update(transitions)

# Normalize by number of conversations
for key in avg_transitions:
    avg_transitions[key] /= len(conversation_transitions)

# Create a DataFrame for visualization
transition_df = pd.DataFrame([
    {'from': from_role, 'to': to_role, 'count': count}
    for (from_role, to_role), count in avg_transitions.items()
])

# Plot as a heatmap
transition_matrix = pd.pivot_table(transition_df, values='count', index='from', columns='to', fill_value=0)
plt.figure(figsize=(10, 8))
sns.heatmap(transition_matrix, annot=True, cmap='YlGnBu', fmt='.2f')
plt.title('Average Conversation Flow Transitions')
plt.xlabel('To Role')
plt.ylabel('From Role')
plt.tight_layout()
plt.savefig('plots_advanced/conversation_flow_heatmap.png')
plt.close()

# 7. Conversation Length Analysis
print("\nAnalyzing conversation lengths...")
# Calculate conversation lengths
conversation_lengths = messages_df.groupby('conversation_id').size().reset_index(name='message_count')
conversation_lengths['word_count'] = messages_df.groupby('conversation_id')['content'].apply(lambda x: ' '.join(x)).apply(lambda x: len(x.split())).values

# Plot distribution of conversation lengths
plt.figure(figsize=(12, 6))
sns.histplot(conversation_lengths['message_count'], bins=30, kde=True)
plt.title('Distribution of Conversation Lengths (Messages)')
plt.xlabel('Number of Messages')
plt.ylabel('Count')
plt.savefig('plots_advanced/conversation_length_messages.png')
plt.close()

plt.figure(figsize=(12, 6))
sns.histplot(conversation_lengths['word_count'], bins=30, kde=True)
plt.title('Distribution of Conversation Lengths (Words)')
plt.xlabel('Number of Words')
plt.ylabel('Count')
plt.savefig('plots_advanced/conversation_length_words.png')
plt.close()

# 8. Emotional Trajectory Analysis
print("\nAnalyzing emotional trajectories...")
# Calculate emotional metrics for each message
messages_df['emotion_positive'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['pos'])
messages_df['emotion_negative'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['neg'])
messages_df['emotion_neutral'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['neu'])

# Calculate emotional trajectory for each conversation
emotion_trajectories = messages_df.groupby(['conversation_id', 'message_position']).agg({
    'emotion_positive': 'mean',
    'emotion_negative': 'mean',
    'emotion_neutral': 'mean'
}).reset_index()

# Sample 5 random conversations for visualization
sampled_convs = np.random.choice(emotion_trajectories['conversation_id'].unique(), 5, replace=False)
sampled_emotions = emotion_trajectories[emotion_trajectories['conversation_id'].isin(sampled_convs)]

# Plot emotional trajectories
fig, axes = plt.subplots(len(sampled_convs), 1, figsize=(14, 4*len(sampled_convs)), sharex=True)
for i, conv_id in enumerate(sampled_convs):
    conv_data = sampled_emotions[sampled_emotions['conversation_id'] == conv_id]
    axes[i].plot(conv_data['message_position'], conv_data['emotion_positive'], 'g-', label='Positive')
    axes[i].plot(conv_data['message_position'], conv_data['emotion_negative'], 'r-', label='Negative')
    axes[i].plot(conv_data['message_position'], conv_data['emotion_neutral'], 'b-', label='Neutral')
    axes[i].set_title(f'Conversation {conv_id} Emotional Trajectory')
    axes[i].set_ylabel('Emotion Score')
    axes[i].grid(True)
    axes[i].legend()

plt.xlabel('Message Position')
plt.tight_layout()
plt.savefig('plots_advanced/emotional_trajectories.png')
plt.close()

# 9. Linguistic Accommodation Analysis
print("\nAnalyzing linguistic accommodation...")
# Calculate linguistic features for each message
messages_df['avg_sentence_length'] = messages_df['content'].apply(lambda x: np.mean([len(sent.split()) for sent in sent_tokenize(x)]) if len(sent_tokenize(x)) > 0 else 0)
messages_df['question_ratio'] = messages_df['content'].apply(lambda x: x.count('?') / len(x) if len(x) > 0 else 0)

# Group by conversation and role
accommodation_metrics = messages_df.groupby(['conversation_id', 'role']).agg({
    'avg_sentence_length': 'mean',
    'question_ratio': 'mean',
    'avg_word_length': 'mean',
    'unique_words_ratio': 'mean'
}).reset_index()

# Calculate differences between roles within each conversation
accommodation_wide = accommodation_metrics.pivot(index='conversation_id', columns='role', values=['avg_sentence_length', 'question_ratio', 'avg_word_length', 'unique_words_ratio'])

# Calculate correlations between provider and patient metrics
correlations = {}
for metric in ['avg_sentence_length', 'question_ratio', 'avg_word_length', 'unique_words_ratio']:
    if (metric, 'provider') in accommodation_wide.columns and (metric, 'patient') in accommodation_wide.columns:
        valid_data = accommodation_wide[[
            (metric, 'provider'), 
            (metric, 'patient')
        ]].dropna()
        
        if len(valid_data) > 0:
            correlation = np.corrcoef(
                valid_data[(metric, 'provider')],
                valid_data[(metric, 'patient')]
            )[0, 1]
            correlations[metric] = correlation

# Plot correlations
plt.figure(figsize=(10, 6))
sns.barplot(x=list(correlations.keys()), y=list(correlations.values()))
plt.title('Linguistic Accommodation: Correlations Between Provider and Patient')
plt.xlabel('Linguistic Feature')
plt.ylabel('Correlation Coefficient')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('plots_advanced/linguistic_accommodation.png')
plt.close()

# 10. Summary Statistics
print("\nGenerating advanced summary statistics...")
# Calculate advanced statistics by role
advanced_stats = messages_df.groupby('role').agg({
    'textblob_polarity': ['mean', 'std'],
    'textblob_subjectivity': ['mean', 'std'],
    'avg_word_length': ['mean', 'std'],
    'unique_words_ratio': ['mean', 'std'],
    'question_ratio': ['mean', 'std']
}).reset_index()

print("\nAdvanced summary statistics by role:")
print(advanced_stats)

# Save advanced statistics to CSV
advanced_stats.to_csv('plots_advanced/advanced_statistics.csv', index=False)

print("\nAdvanced analysis complete! All plots saved to the 'plots_advanced' directory.")

if __name__ == "__main__":
    print("\nScript executed successfully!")
