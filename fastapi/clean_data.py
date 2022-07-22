import pandas as pd
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords 
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import  accuracy_score,classification_report, confusion_matrix  #for visualizing tree 
import scipy
from scipy.sparse import hstack
from scipy.sparse import coo_matrix
from scipy import sparse
nltk.download('omw-1.4')
def preprocess(text):
    text = text.lower()
    text = ''.join(c for c in text if not c.isdigit()) #remove digits.
    stop_words = stopwords.words('english') # removes words which has less meaning 
    text = ' '.join([w for w in nltk.word_tokenize(text) if not w in stop_words])
    wordnet_lemmatizer = WordNetLemmatizer() # with use of morphological analysis of words
    text = [wordnet_lemmatizer.lemmatize(word) for word in nltk.word_tokenize(text)]
    text = " ".join(w for w in text)
    return text

def extract_tfidf(training_headlines, training_bodies,  test_headlines="", test_bodies=""):
    len(training_bodies)
    # Text vectorisation
    body_vectorizer = TfidfVectorizer(ngram_range=(1, 2), lowercase=True, stop_words='english',strip_accents='unicode')#, max_features=1024)
    bodies_tfidf = body_vectorizer.fit_transform(training_bodies)

    # Title vectorisation
    headline_vectorizer = TfidfVectorizer(ngram_range=(1, 2), lowercase=True, stop_words='english',strip_accents='unicode')#, max_features=1024)
    headlines_tfidf = headline_vectorizer.fit_transform(training_headlines)


    bodies_tfidf_test = body_vectorizer.transform(test_bodies)
    headlines_tfidf_test = headline_vectorizer.transform(test_headlines)
    
    feature_names = np.array(body_vectorizer.get_feature_names())
    sorted_by_idf = np.argsort(body_vectorizer.idf_) 
    print('Features with lowest and highest idf in the body vector:\n')
    # The token which appears maximum times but it is also in all documents, has its idf the lowest
    print("Features with lowest idf:\n{}".format(
    feature_names[sorted_by_idf[:10]]))
    # The tokens can have the most idf weight because they are the only tokens that appear in one document only
    print("\nFeatures with highest idf:\n{}".format(
    feature_names[sorted_by_idf[-10:]]))

    # Combine body_tfdif with headline_tfidf for every data point. 
    training_tfidf = scipy.sparse.hstack([bodies_tfidf, headlines_tfidf])
    test_tfidf = scipy.sparse.hstack([bodies_tfidf_test, headlines_tfidf_test])

    return training_tfidf, test_tfidf,body_vectorizer

def extract_cosine_similarity(headlines, bodies):
    vectorizer = TfidfVectorizer(ngram_range=(1,2), lowercase=True, stop_words='english',strip_accents='unicode')#, max_features=1024)
    
    cos_sim_features = []
    for i in range(0, len(bodies)):
        body_vs_headline = []
        body_vs_headline.append(bodies[i])
        body_vs_headline.append(headlines[i])
        print(body_vs_headline,"printt")
        tfidf = vectorizer.fit_transform(body_vs_headline)
        cosine_similarity = (tfidf * tfidf.T).A
        cos_sim_features.append(cosine_similarity[0][1])

    # Convert the list to a sparse matrix (in order to concatenate the cos sim with other features)
    cos_sim_array = scipy.sparse.coo_matrix(np.array(cos_sim_features)) 

    return cos_sim_array

def combine_features(tfidf_vectors, cosine_similarity):
    ## Combining features
    combined_features =  sparse.bmat([[tfidf_vectors, cosine_similarity.T]])
    return combined_features    