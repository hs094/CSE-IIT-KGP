#!/usr/bin/env python3
# Generate a comprehensive HTML report of the NLP analysis

import os
import base64
import pandas as pd
import glob
from datetime import datetime

def img_to_base64(img_path):
    """Convert an image to base64 encoding for embedding in HTML"""
    with open(img_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

def create_html_report():
    """Create a comprehensive HTML report of all analyses"""
    # Get all image files from both plot directories
    basic_plots = sorted(glob.glob('plots/*.png'))
    advanced_plots = sorted(glob.glob('plots_advanced/*.png'))
    interactive_plots = sorted(glob.glob('plots/*.html'))

    # Load summary statistics
    basic_stats = pd.read_csv('plots/summary_statistics.csv', header=[0, 1])
    advanced_stats = pd.read_csv('plots_advanced/advanced_statistics.csv', header=[0, 1])

    # Extract provider and patient data
    provider_basic = basic_stats.iloc[1]  # Provider is the second row (index 1)
    patient_basic = basic_stats.iloc[0]   # Patient is the first row (index 0)

    provider_advanced = advanced_stats.iloc[1]  # Provider is the second row
    patient_advanced = advanced_stats.iloc[0]   # Patient is the first row

    # Create HTML content
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EDosthi Dataset NLP Analysis Report</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                color: #333;
                max-width: 1200px;
                margin: 0 auto;
            }}
            h1, h2, h3, h4 {{
                color: #2c3e50;
            }}
            h1 {{
                text-align: center;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
                margin-bottom: 30px;
            }}
            h2 {{
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
                margin-top: 40px;
            }}
            .image-container {{
                margin: 20px 0;
                text-align: center;
            }}
            .image-container img {{
                max-width: 100%;
                height: auto;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0,0,0,0.1);
            }}
            .caption {{
                margin-top: 10px;
                font-style: italic;
                color: #666;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }}
            th, td {{
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }}
            th {{
                background-color: #f2f2f2;
            }}
            tr:nth-child(even) {{
                background-color: #f9f9f9;
            }}
            .interactive-link {{
                display: block;
                margin: 20px 0;
                padding: 10px;
                background-color: #3498db;
                color: white;
                text-align: center;
                text-decoration: none;
                border-radius: 5px;
            }}
            .interactive-link:hover {{
                background-color: #2980b9;
            }}
            .section {{
                margin-bottom: 40px;
            }}
            .footer {{
                margin-top: 50px;
                text-align: center;
                font-size: 0.9em;
                color: #777;
                border-top: 1px solid #ddd;
                padding-top: 20px;
            }}
        </style>
    </head>
    <body>
        <h1>EDosthi Dataset NLP Analysis Report</h1>
        <p>This report presents a comprehensive NLP analysis of the EDosthi dataset, which contains 1000 multi-turn conversations for tobacco cessation counseling.</p>
        <p><strong>Generated on:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>

        <div class="section">
            <h2>1. Dataset Overview</h2>
            <p>The EDosthi dataset contains 1000 multi-turn conversations between providers and patients focused on tobacco cessation counseling. Each conversation consists of multiple messages exchanged between a provider and a patient.</p>

            <h3>1.1 Basic Statistics</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/message_length_distribution.png')}" alt="Message Length Distribution">
                <p class="caption">Message Length Distribution by Role</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/word_count_distribution.png')}" alt="Word Count Distribution">
                <p class="caption">Word Count Distribution by Role</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/sentence_count_distribution.png')}" alt="Sentence Count Distribution">
                <p class="caption">Sentence Count Distribution by Role</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/conversation_length_messages.png')}" alt="Conversation Length (Messages)">
                <p class="caption">Distribution of Conversation Lengths (Messages)</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/conversation_length_words.png')}" alt="Conversation Length (Words)">
                <p class="caption">Distribution of Conversation Lengths (Words)</p>
            </div>
        </div>

        <div class="section">
            <h2>2. Sentiment Analysis</h2>
            <p>Sentiment analysis was performed to understand the emotional tone of messages in the conversations.</p>

            <h3>2.1 Sentiment Distribution</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/sentiment_distribution.png')}" alt="Sentiment Distribution">
                <p class="caption">Sentiment Distribution by Role</p>
            </div>

            <h3>2.2 Sentiment Progression</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/sentiment_progression.png')}" alt="Sentiment Progression">
                <p class="caption">Average Sentiment Progression in Conversations</p>
            </div>

            <h3>2.3 Advanced Sentiment Analysis</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/sentiment_comparison.png')}" alt="Sentiment Comparison">
                <p class="caption">Comparison of Different Sentiment Analysis Methods</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/sentiment_progression_sample.png')}" alt="Sentiment Progression Sample">
                <p class="caption">Sentiment Progression in Sample Conversations</p>
            </div>

            <h3>2.4 Subjectivity Analysis</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/subjectivity_distribution.png')}" alt="Subjectivity Distribution">
                <p class="caption">Subjectivity Distribution by Role</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/subjectivity_progression.png')}" alt="Subjectivity Progression">
                <p class="caption">Average Subjectivity Progression in Conversations</p>
            </div>

            <h3>2.5 Emotional Trajectories</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/emotional_trajectories.png')}" alt="Emotional Trajectories">
                <p class="caption">Emotional Trajectories in Sample Conversations</p>
            </div>
        </div>

        <div class="section">
            <h2>3. Linguistic Analysis</h2>

            <h3>3.1 Readability Metrics</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/readability_metrics.png')}" alt="Readability Metrics">
                <p class="caption">Readability Metrics by Role</p>
            </div>

            <h3>3.2 Lexical Diversity</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/lexical_diversity.png')}" alt="Lexical Diversity">
                <p class="caption">Lexical Diversity by Role</p>
            </div>

            <h3>3.3 Word Length and Uniqueness</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/avg_word_length.png')}" alt="Average Word Length">
                <p class="caption">Average Word Length by Role</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/unique_words_ratio.png')}" alt="Unique Words Ratio">
                <p class="caption">Unique Words Ratio by Role</p>
            </div>

            <h3>3.4 Part-of-Speech Distribution</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/pos_distribution.png')}" alt="POS Distribution">
                <p class="caption">Part-of-Speech Distribution by Role</p>
            </div>

            <h3>3.5 Linguistic Accommodation</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/linguistic_accommodation.png')}" alt="Linguistic Accommodation">
                <p class="caption">Linguistic Accommodation Between Provider and Patient</p>
            </div>
        </div>

        <div class="section">
            <h2>4. Word Frequency Analysis</h2>

            <h3>4.1 Word Clouds</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/wordcloud_provider.png')}" alt="Provider Word Cloud">
                <p class="caption">Word Cloud for Provider Messages</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/wordcloud_patient.png')}" alt="Patient Word Cloud">
                <p class="caption">Word Cloud for Patient Messages</p>
            </div>

            <h3>4.2 N-gram Analysis</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/top_bigrams_provider.png')}" alt="Provider Bigrams">
                <p class="caption">Top Bigrams in Provider Messages</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/top_bigrams_patient.png')}" alt="Patient Bigrams">
                <p class="caption">Top Bigrams in Patient Messages</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/top_trigrams_provider.png')}" alt="Provider Trigrams">
                <p class="caption">Top Trigrams in Provider Messages</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/top_trigrams_patient.png')}" alt="Patient Trigrams">
                <p class="caption">Top Trigrams in Patient Messages</p>
            </div>

            <h3>4.3 TF-IDF Analysis</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/tfidf_top_terms_provider.png')}" alt="Provider TF-IDF">
                <p class="caption">Top TF-IDF Terms for Provider Role</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/tfidf_top_terms_patient.png')}" alt="Patient TF-IDF">
                <p class="caption">Top TF-IDF Terms for Patient Role</p>
            </div>
        </div>

        <div class="section">
            <h2>5. Named Entity Recognition</h2>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/entity_types.png')}" alt="Entity Types">
                <p class="caption">Top Named Entity Types</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/top_entities_PERSON.png')}" alt="Person Entities">
                <p class="caption">Top Person Entities</p>
            </div>
        </div>

        <div class="section">
            <h2>6. Topic Modeling and Clustering</h2>

            <h3>6.1 Topic Modeling</h3>
            <p>The LDA topic modeling identified 10 main topics in the conversations:</p>
            <ol>
                <li>General conversation patterns (yeah, like, maybe, think)</li>
                <li>Health concerns and quitting motivation (health, quitting, smoking, weight)</li>
                <li>Coping strategies (stress, manage, coping, help, symptom)</li>
                <li>Conversation evaluation (conversation, improved, value, clinical)</li>
                <li>Planning and support (plan, let, sound, work, great, support)</li>
                <li>Introduction and tobacco use (tobacco, use, help, welcome)</li>
                <li>Counseling techniques (patient, provider, motivational, interviewing)</li>
                <li>Decision making (would, maybe, think, could, quitting)</li>
                <li>Quitting process (quitting, quit, make, sound)</li>
                <li>Personal experiences (like, smoking, feel, cigarette)</li>
            </ol>

            <h3>6.2 Clustering Analysis</h3>
            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/tsne_clusters.png')}" alt="t-SNE Clusters">
                <p class="caption">t-SNE Visualization of Message Clusters</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/tsne_roles.png')}" alt="t-SNE Roles">
                <p class="caption">t-SNE Visualization of Messages by Role</p>
            </div>
        </div>

        <div class="section">
            <h2>7. Conversation Flow Analysis</h2>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots/turn_transitions.png')}" alt="Turn Transitions">
                <p class="caption">Conversation Turn Transition Probabilities</p>
            </div>

            <div class="image-container">
                <img src="data:image/png;base64,{img_to_base64('plots_advanced/conversation_flow_heatmap.png')}" alt="Conversation Flow">
                <p class="caption">Average Conversation Flow Transitions</p>
            </div>
        </div>

        <div class="section">
            <h2>8. Summary Statistics</h2>

            <h3>8.1 Basic Statistics</h3>
            <table>
                <tr>
                    <th>Role</th>
                    <th>Message Count</th>
                    <th>Avg Message Length</th>
                    <th>Avg Word Count</th>
                    <th>Avg Sentence Count</th>
                    <th>Avg Sentiment</th>
                    <th>Avg Lexical Diversity</th>
                </tr>
                <tr>
                    <td>Provider</td>
                    <td>7455</td>
                    <td>{provider_basic[('message_length', 'mean')]:.2f}</td>
                    <td>{provider_basic[('word_count', 'mean')]:.2f}</td>
                    <td>{provider_basic[('sentence_count', 'mean')]:.2f}</td>
                    <td>{provider_basic[('sentiment_compound', 'mean')]:.2f}</td>
                    <td>{provider_basic[('lexical_diversity', 'mean')]:.2f}</td>
                </tr>
                <tr>
                    <td>Patient</td>
                    <td>3466</td>
                    <td>{patient_basic[('message_length', 'mean')]:.2f}</td>
                    <td>{patient_basic[('word_count', 'mean')]:.2f}</td>
                    <td>{patient_basic[('sentence_count', 'mean')]:.2f}</td>
                    <td>{patient_basic[('sentiment_compound', 'mean')]:.2f}</td>
                    <td>{patient_basic[('lexical_diversity', 'mean')]:.2f}</td>
                </tr>
            </table>

            <h3>8.2 Advanced Statistics</h3>
            <table>
                <tr>
                    <th>Role</th>
                    <th>TextBlob Polarity</th>
                    <th>TextBlob Subjectivity</th>
                    <th>Avg Word Length</th>
                    <th>Unique Words Ratio</th>
                    <th>Question Ratio</th>
                </tr>
                <tr>
                    <td>Provider</td>
                    <td>{provider_advanced[('textblob_polarity', 'mean')]:.2f}</td>
                    <td>{provider_advanced[('textblob_subjectivity', 'mean')]:.2f}</td>
                    <td>{provider_advanced[('avg_word_length', 'mean')]:.2f}</td>
                    <td>{provider_advanced[('unique_words_ratio', 'mean')]:.2f}</td>
                    <td>{provider_advanced[('question_ratio', 'mean')]:.4f}</td>
                </tr>
                <tr>
                    <td>Patient</td>
                    <td>{patient_advanced[('textblob_polarity', 'mean')]:.2f}</td>
                    <td>{patient_advanced[('textblob_subjectivity', 'mean')]:.2f}</td>
                    <td>{patient_advanced[('avg_word_length', 'mean')]:.2f}</td>
                    <td>{patient_advanced[('unique_words_ratio', 'mean')]:.2f}</td>
                    <td>{patient_advanced[('question_ratio', 'mean')]:.4f}</td>
                </tr>
            </table>
        </div>

        <div class="section">
            <h2>9. Interactive Visualizations</h2>
            <p>The following interactive visualizations provide more detailed insights:</p>

            <a href="plots/interactive_message_length.html" class="interactive-link" target="_blank">Interactive Message Length Distribution</a>
            <a href="plots/interactive_word_count.html" class="interactive-link" target="_blank">Interactive Word Count Distribution</a>
            <a href="plots/interactive_sentiment_vs_length.html" class="interactive-link" target="_blank">Interactive Sentiment vs Message Length</a>
            <a href="plots/interactive_readability.html" class="interactive-link" target="_blank">Interactive Readability Metrics</a>
        </div>

        <div class="section">
            <h2>10. Key Findings and Insights</h2>

            <h3>10.1 Provider vs. Patient Communication Patterns</h3>
            <ul>
                <li>Providers tend to use longer messages (avg {provider_basic[('message_length', 'mean')]:.1f} characters) compared to patients (avg {patient_basic[('message_length', 'mean')]:.1f} characters)</li>
                <li>Providers use more words per message (avg {provider_basic[('word_count', 'mean')]:.1f}) than patients (avg {patient_basic[('word_count', 'mean')]:.1f})</li>
                <li>Providers have higher question ratios ({provider_advanced[('question_ratio', 'mean')]:.4f}) compared to patients ({patient_advanced[('question_ratio', 'mean')]:.4f}), indicating their role in guiding the conversation</li>
                <li>Providers show more positive sentiment (avg {provider_basic[('sentiment_compound', 'mean')]:.2f}) compared to patients (avg {patient_basic[('sentiment_compound', 'mean')]:.2f})</li>
            </ul>

            <h3>10.2 Conversation Dynamics</h3>
            <ul>
                <li>Conversations typically follow a provider-patient-provider pattern, with providers initiating and concluding most exchanges</li>
                <li>Sentiment tends to become more positive as conversations progress, suggesting effective counseling</li>
                <li>Provider messages show higher subjectivity ({provider_advanced[('textblob_subjectivity', 'mean')]:.2f}) compared to patients ({patient_advanced[('textblob_subjectivity', 'mean')]:.2f}), indicating more opinion-based content</li>
                <li>Linguistic accommodation is evident in several features, suggesting providers adapt their communication style to match patients</li>
            </ul>

            <h3>10.3 Content Analysis</h3>
            <ul>
                <li>Key topics include health concerns, coping strategies, quitting motivation, and support planning</li>
                <li>Provider messages focus more on support, planning, and education (evident in TF-IDF terms)</li>
                <li>Patient messages focus more on personal experiences, challenges, and concerns</li>
                <li>Named entity recognition identified common references to people, organizations, and time periods</li>
            </ul>
        </div>

        <div class="footer">
            <p>EDosthi Dataset NLP Analysis Report | Generated on {datetime.now().strftime('%Y-%m-%d')}</p>
        </div>
    </body>
    </html>
    """

    # Write HTML to file
    with open('edosthi_nlp_analysis_report.html', 'w') as f:
        f.write(html_content)

    print(f"HTML report generated: edosthi_nlp_analysis_report.html")

if __name__ == "__main__":
    create_html_report()
