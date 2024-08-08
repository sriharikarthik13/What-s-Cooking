#Having visualized and understood that XGBoost is providing us with the best accuracy, we will build our final cuisine prediction function using the XGBoost model.
#Import the required libraries
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import xgboost as xgb

def final_cuisine_predictor(input_list):
    #Let us first convert all our ingredients into a single string for preprocessing -> For label encoding
    df= pd.read_json('./train.json')
    df['ingredients'] = df['ingredients'].apply(lambda x : ' '.join(x))

    #Let us encode the cuisine labels
    label_encoder = LabelEncoder()
    df['encoded_cuisine'] = label_encoder.fit_transform(df['cuisine'])

    #Now we will utilize the CountVectorizer to convert the string of ingredients into a matrix of token counts
    
    vector = CountVectorizer()
    X=vector.fit_transform(df['ingredients'])

    #Now let us split the data for train and test purposes:
    
    X_train,X_test,y_train,y_test = train_test_split(X,df['encoded_cuisine'],test_size=0.2, random_state=42)

    #Build the model and predict the cuisine of the given input
    model = xgb.XGBClassifier()
    model.fit(X_train,y_train)

    #Let us now predict the cuisine of the given set of ingredients
    list_ing = ' '.join(input_list)

    vect_ing = vector.transform([list_ing])
    predicted_cuisine = model.predict(vect_ing)
    cuisine = label_encoder.inverse_transform(predicted_cuisine)
    return cuisine[0]
    
    
    
cuisine = final_cuisine_predictor(["bread","salt","eggs","jam", "butter"])
    
print(cuisine)
    
    