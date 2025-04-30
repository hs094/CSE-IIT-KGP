#!/usr/bin/env python3
# First analysis of the edosthi dataset

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
from textblob import TextBlob
from wordcloud import WordCloud
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import gensim
from gensim import corpora
import pyLDAvis
import pyLDAvis.gensim_models
import warnings

# Ignore warnings
warnings.filterwarnings('ignore')

# Set style for plots
plt.style.use('ggplot')
sns.set(font_scale=1.2)
sns.set_style("whitegrid")

# Create output directory for plots
os.makedirs('plots', exist_ok=True)

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

# Function to calculate lexical diversity
def lexical_diversity(text):
    tokens = word_tokenize(text.lower())
    if len(tokens) == 0:
        return 0
    return len(set(tokens)) / len(tokens)

# Load the dataset
print("Loading dataset...")
with open('edosthi_dataset.json', 'r') as f:
    data = json.load(f)

print(f"Dataset loaded. Contains {len(data)} conversations.")

# Create a DataFrame for conversations
conversations_df = pd.DataFrame(data)

# Display basic information about the dataset
print("\nBasic dataset information:")
print(f"Number of conversations: {len(conversations_df)}")

# Extract all messages into a flat structure
print("\nExtracting messages...")
all_messages = []
for idx, conversation in tqdm(conversations_df.iterrows(), total=len(conversations_df)):
    messages = extract_messages(conversation)
    for message in messages:
        message['conversation_id'] = idx
        message['metadata'] = conversation['metadata']
        all_messages.append(message)

messages_df = pd.DataFrame(all_messages)
print(f"Total messages extracted: {len(messages_df)}")

# Basic statistics
print("\nCalculating basic statistics...")
role_counts = messages_df['role'].value_counts()
print(f"Message counts by role:\n{role_counts}")

# Calculate message lengths
messages_df['message_length'] = messages_df['content'].apply(len)
messages_df['word_count'] = messages_df['content'].apply(lambda x: len(word_tokenize(x)))
messages_df['sentence_count'] = messages_df['content'].apply(lambda x: len(sent_tokenize(x)))

# Group by conversation_id and role to get statistics per conversation
conversation_stats = messages_df.groupby(['conversation_id', 'role']).agg({
    'message_length': ['mean', 'min', 'max', 'sum'],
    'word_count': ['mean', 'min', 'max', 'sum'],
    'sentence_count': ['mean', 'min', 'max', 'sum']
}).reset_index()

# Plot message length distribution by role
plt.figure(figsize=(12, 6))
sns.histplot(data=messages_df, x='message_length', hue='role', bins=30, kde=True)
plt.title('Message Length Distribution by Role')
plt.xlabel('Message Length (characters)')
plt.ylabel('Count')
plt.savefig('plots/message_length_distribution.png')
plt.close()

# Plot word count distribution by role
plt.figure(figsize=(12, 6))
sns.histplot(data=messages_df, x='word_count', hue='role', bins=30, kde=True)
plt.title('Word Count Distribution by Role')
plt.xlabel('Word Count')
plt.ylabel('Count')
plt.savefig('plots/word_count_distribution.png')
plt.close()

# Plot sentence count distribution by role
plt.figure(figsize=(12, 6))
sns.histplot(data=messages_df, x='sentence_count', hue='role', bins=30, kde=True)
plt.title('Sentence Count Distribution by Role')
plt.xlabel('Sentence Count')
plt.ylabel('Count')
plt.savefig('plots/sentence_count_distribution.png')
plt.close()

# Sentiment Analysis
print("\nPerforming sentiment analysis...")
messages_df['sentiment_compound'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['compound'])
messages_df['sentiment_positive'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['pos'])
messages_df['sentiment_negative'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['neg'])
messages_df['sentiment_neutral'] = messages_df['content'].apply(lambda x: sid.polarity_scores(x)['neu'])

# Plot sentiment distribution by role
plt.figure(figsize=(12, 6))
sns.boxplot(data=messages_df, x='role', y='sentiment_compound')
plt.title('Sentiment Distribution by Role')
plt.xlabel('Role')
plt.ylabel('Sentiment Compound Score')
plt.savefig('plots/sentiment_distribution.png')
plt.close()

# Plot sentiment over conversation progression
# Group by conversation_id and message position
messages_df['message_position'] = messages_df.groupby('conversation_id').cumcount() + 1
avg_sentiment_by_position = messages_df.groupby(['message_position', 'role'])['sentiment_compound'].mean().reset_index()

# Only plot up to the 20th message position (most conversations)
avg_sentiment_by_position = avg_sentiment_by_position[avg_sentiment_by_position['message_position'] <= 20]

plt.figure(figsize=(14, 7))
for role in avg_sentiment_by_position['role'].unique():
    role_data = avg_sentiment_by_position[avg_sentiment_by_position['role'] == role]
    plt.plot(role_data['message_position'], role_data['sentiment_compound'], marker='o', label=role)

plt.title('Average Sentiment Progression in Conversations')
plt.xlabel('Message Position in Conversation')
plt.ylabel('Average Sentiment Compound Score')
plt.legend()
plt.grid(True)
plt.savefig('plots/sentiment_progression.png')
plt.close()

# Readability Analysis
print("\nCalculating readability metrics...")
messages_df['flesch_reading_ease'] = messages_df['content'].apply(textstat.flesch_reading_ease)
messages_df['flesch_kincaid_grade'] = messages_df['content'].apply(textstat.flesch_kincaid_grade)
messages_df['smog_index'] = messages_df['content'].apply(textstat.smog_index)
messages_df['coleman_liau_index'] = messages_df['content'].apply(textstat.coleman_liau_index)
messages_df['automated_readability_index'] = messages_df['content'].apply(textstat.automated_readability_index)

# Plot readability metrics by role
readability_metrics = ['flesch_reading_ease', 'flesch_kincaid_grade', 'smog_index',
                       'coleman_liau_index', 'automated_readability_index']

plt.figure(figsize=(15, 10))
for i, metric in enumerate(readability_metrics, 1):
    plt.subplot(2, 3, i)
    sns.boxplot(data=messages_df, x='role', y=metric)
    plt.title(f'{metric.replace("_", " ").title()} by Role')
    plt.xlabel('Role')
    plt.ylabel(metric.replace("_", " ").title())

plt.tight_layout()
plt.savefig('plots/readability_metrics.png')
plt.close()

# Lexical Diversity Analysis
print("\nCalculating lexical diversity...")
messages_df['lexical_diversity'] = messages_df['content'].apply(lexical_diversity)

plt.figure(figsize=(10, 6))
sns.boxplot(data=messages_df, x='role', y='lexical_diversity')
plt.title('Lexical Diversity by Role')
plt.xlabel('Role')
plt.ylabel('Lexical Diversity (Type-Token Ratio)')
plt.savefig('plots/lexical_diversity.png')
plt.close()

# Named Entity Recognition
print("\nPerforming named entity recognition...")
# Sample a subset of messages for NER analysis (to save time)
ner_sample = messages_df.sample(min(500, len(messages_df)))
entity_counts = defaultdict(Counter)

for _, row in tqdm(ner_sample.iterrows(), total=len(ner_sample)):
    doc = nlp(row['content'])
    for ent in doc.ents:
        entity_counts[ent.label_][ent.text.lower()] += 1

# Plot entity type distribution
entity_type_counts = {ent_type: sum(counts.values()) for ent_type, counts in entity_counts.items()}
entity_type_df = pd.DataFrame(list(entity_type_counts.items()), columns=['Entity Type', 'Count'])
entity_type_df = entity_type_df.sort_values('Count', ascending=False).head(10)

plt.figure(figsize=(12, 6))
sns.barplot(data=entity_type_df, x='Entity Type', y='Count')
plt.title('Top 10 Named Entity Types')
plt.xlabel('Entity Type')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('plots/entity_types.png')
plt.close()

# Plot top entities for each major entity type
for ent_type, counts in entity_counts.items():
    if sum(counts.values()) > 10:  # Only plot if there are enough entities
        top_entities = pd.DataFrame(counts.most_common(10), columns=['Entity', 'Count'])

        plt.figure(figsize=(12, 6))
        sns.barplot(data=top_entities, x='Entity', y='Count')
        plt.title(f'Top 10 {ent_type} Entities')
        plt.xlabel('Entity')
        plt.ylabel('Count')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f'plots/top_entities_{ent_type}.png')
        plt.close()

# Word Frequency Analysis
print("\nAnalyzing word frequencies...")
# Combine all text by role
role_texts = {}
for role in messages_df['role'].unique():
    role_texts[role] = ' '.join(messages_df[messages_df['role'] == role]['content'])

# Generate word clouds for each role
for role, text in role_texts.items():
    # Preprocess text
    tokens = preprocess_text(text)
    text = ' '.join(tokens)

    # Generate word cloud
    wordcloud = WordCloud(width=800, height=400, background_color='white', max_words=100).generate(text)

    plt.figure(figsize=(12, 6))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title(f'Word Cloud for {role.title()} Messages')
    plt.tight_layout()
    plt.savefig(f'plots/wordcloud_{role}.png')
    plt.close()

# N-gram Analysis
print("\nPerforming n-gram analysis...")
for role in messages_df['role'].unique():
    role_text = ' '.join(messages_df[messages_df['role'] == role]['content'])
    tokens = preprocess_text(role_text)

    # Generate bigrams
    bi_grams = list(ngrams(tokens, 2))
    bigram_freq = Counter(bi_grams)

    # Generate trigrams
    tri_grams = list(ngrams(tokens, 3))
    trigram_freq = Counter(tri_grams)

    # Plot top bigrams
    top_bigrams = pd.DataFrame(bigram_freq.most_common(15), columns=['Bigram', 'Frequency'])
    top_bigrams['Bigram'] = top_bigrams['Bigram'].apply(lambda x: ' '.join(x))

    plt.figure(figsize=(12, 6))
    sns.barplot(data=top_bigrams, x='Frequency', y='Bigram')
    plt.title(f'Top 15 Bigrams in {role.title()} Messages')
    plt.xlabel('Frequency')
    plt.ylabel('Bigram')
    plt.tight_layout()
    plt.savefig(f'plots/top_bigrams_{role}.png')
    plt.close()

    # Plot top trigrams
    top_trigrams = pd.DataFrame(trigram_freq.most_common(15), columns=['Trigram', 'Frequency'])
    top_trigrams['Trigram'] = top_trigrams['Trigram'].apply(lambda x: ' '.join(x))

    plt.figure(figsize=(12, 6))
    sns.barplot(data=top_trigrams, x='Frequency', y='Trigram')
    plt.title(f'Top 15 Trigrams in {role.title()} Messages')
    plt.xlabel('Frequency')
    plt.ylabel('Trigram')
    plt.tight_layout()
    plt.savefig(f'plots/top_trigrams_{role}.png')
    plt.close()

# Topic Modeling
print("\nPerforming topic modeling...")
# Prepare corpus for topic modeling
processed_docs = []
for _, row in tqdm(messages_df.iterrows(), total=len(messages_df)):
    tokens = preprocess_text(row['content'])
    if tokens:  # Only add if there are tokens after preprocessing
        processed_docs.append(tokens)

# Create dictionary and corpus
dictionary = corpora.Dictionary(processed_docs)
corpus = [dictionary.doc2bow(doc) for doc in processed_docs]

# Train LDA model
num_topics = 10
lda_model = gensim.models.LdaModel(
    corpus=corpus,
    id2word=dictionary,
    num_topics=num_topics,
    random_state=42,
    passes=10
)

# Print topics
print("\nTop topics:")
for idx, topic in lda_model.print_topics(-1):
    print(f'Topic {idx}: {topic}')

# Visualize topics
try:
    # Instead of using pyLDAvis, let's create our own visualization of the topics
    # Create a DataFrame with the top terms for each topic
    topic_terms = []
    for topic_id in range(num_topics):
        top_terms = lda_model.show_topic(topic_id, topn=20)  # Get top 20 terms for each topic
        for term, weight in top_terms:
            topic_terms.append({
                'Topic': topic_id,
                'Term': term,
                'Weight': weight
            })

    topic_terms_df = pd.DataFrame(topic_terms)

    # Create a heatmap of the top terms across topics
    pivot_df = topic_terms_df.pivot(index='Term', columns='Topic', values='Weight')
    pivot_df = pivot_df.fillna(0)

    # Sort terms by maximum weight across topics
    pivot_df['max'] = pivot_df.max(axis=1)
    pivot_df = pivot_df.sort_values('max', ascending=False).drop('max', axis=1)

    # Take top 30 terms
    pivot_df = pivot_df.head(30)

    plt.figure(figsize=(15, 12))
    sns.heatmap(pivot_df, annot=False, cmap='YlGnBu')
    plt.title('Top Terms Across Topics')
    plt.xlabel('Topic ID')
    plt.ylabel('Term')
    plt.tight_layout()
    plt.savefig('plots/topic_terms_heatmap.png')
    plt.close()

    # Create bar plots for each topic
    for topic_id in range(num_topics):
        topic_df = topic_terms_df[topic_terms_df['Topic'] == topic_id].sort_values('Weight', ascending=False).head(10)

        plt.figure(figsize=(10, 6))
        sns.barplot(data=topic_df, x='Weight', y='Term')
        plt.title(f'Top 10 Terms in Topic {topic_id}')
        plt.xlabel('Weight')
        plt.ylabel('Term')
        plt.tight_layout()
        plt.savefig(f'plots/topic_{topic_id}_terms.png')
        plt.close()

    print("Topic visualizations saved to plots/ directory")

    # Save topic terms to CSV for reference
    topic_terms_df.to_csv('plots/topic_terms.csv', index=False)
    print("Topic terms saved to plots/topic_terms.csv")

except Exception as e:
    print(f"Error creating topic visualizations: {e}")
    import traceback
    traceback.print_exc()

# Conversation Flow Analysis
print("\nAnalyzing conversation flow...")
# Calculate turn-taking patterns
messages_df['next_role'] = messages_df.groupby('conversation_id')['role'].shift(-1)
turn_transitions = messages_df.dropna(subset=['next_role']).groupby(['role', 'next_role']).size().reset_index(name='count')

# Create a transition matrix
roles = messages_df['role'].unique()
transition_matrix = pd.DataFrame(0, index=roles, columns=roles)

for _, row in turn_transitions.iterrows():
    transition_matrix.loc[row['role'], row['next_role']] = row['count']

# Normalize by row
transition_matrix_norm = transition_matrix.div(transition_matrix.sum(axis=1), axis=0)

# Plot heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(transition_matrix_norm, annot=True, cmap='YlGnBu', fmt='.2f')
plt.title('Conversation Turn Transition Probabilities')
plt.xlabel('Next Role')
plt.ylabel('Current Role')
plt.tight_layout()
plt.savefig('plots/turn_transitions.png')
plt.close()

# Interactive Visualizations with Plotly
print("\nCreating interactive visualizations...")

# Message length by role (interactive)
fig = px.box(messages_df, x='role', y='message_length', color='role',
             title='Message Length Distribution by Role',
             labels={'message_length': 'Message Length (characters)', 'role': 'Role'})
fig.write_html('plots/interactive_message_length.html')

# Word count by role (interactive)
fig = px.box(messages_df, x='role', y='word_count', color='role',
             title='Word Count Distribution by Role',
             labels={'word_count': 'Word Count', 'role': 'Role'})
fig.write_html('plots/interactive_word_count.html')

# Sentiment analysis (interactive)
fig = px.scatter(messages_df, x='message_length', y='sentiment_compound', color='role',
                 title='Sentiment vs Message Length',
                 labels={'message_length': 'Message Length (characters)',
                         'sentiment_compound': 'Sentiment Score',
                         'role': 'Role'},
                 opacity=0.7)
fig.write_html('plots/interactive_sentiment_vs_length.html')

# Readability metrics (interactive)
fig = make_subplots(rows=2, cols=2,
                    subplot_titles=('Flesch Reading Ease', 'Flesch-Kincaid Grade',
                                    'SMOG Index', 'Coleman-Liau Index'))

for i, metric in enumerate(['flesch_reading_ease', 'flesch_kincaid_grade',
                           'smog_index', 'coleman_liau_index']):
    row, col = (i // 2) + 1, (i % 2) + 1
    for role in messages_df['role'].unique():
        role_data = messages_df[messages_df['role'] == role]
        fig.add_trace(
            go.Box(y=role_data[metric], name=role, legendgroup=role, showlegend=(i==0)),
            row=row, col=col
        )

fig.update_layout(title_text='Readability Metrics by Role', height=800, width=1000)
fig.write_html('plots/interactive_readability.html')

# Summary statistics
print("\nGenerating summary statistics...")
summary_stats = messages_df.groupby('role').agg({
    'message_length': ['mean', 'std', 'min', 'max'],
    'word_count': ['mean', 'std', 'min', 'max'],
    'sentence_count': ['mean', 'std', 'min', 'max'],
    'sentiment_compound': ['mean', 'std', 'min', 'max'],
    'lexical_diversity': ['mean', 'std', 'min', 'max'],
    'flesch_reading_ease': ['mean', 'std'],
    'flesch_kincaid_grade': ['mean', 'std']
}).reset_index()

print("\nSummary statistics by role:")
print(summary_stats)

# Save summary statistics to CSV
summary_stats.to_csv('plots/summary_statistics.csv', index=False)

print("\nAnalysis complete! All plots saved to the 'plots' directory.")

if __name__ == "__main__":
    print("\nScript executed successfully!")
