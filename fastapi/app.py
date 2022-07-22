from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from News import News
from clean_data import *
pickle_in = open("pickle_model.pkl","rb")
with open('train_title.pkl', 'rb') as f:
       train_title= pickle.load(f)
with open('train_body.pkl', 'rb') as f:
       train_body= pickle.load(f)

classifier_NB=pickle.load(pickle_in)
app=FastAPI()
origins = [
   
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def index():
    df=pd.DataFrame({"A":[1,2,3,4]})
    print(df)
    return {'message':df.to_json(orient="records")}
@app.post('/publish')    
async def publish_news(news:News):
    print(train_title)
    title=preprocess(news.headline)
    body=preprocess(news.body)
    training_tfidf, new_data_tfidf,txt_vector= extract_tfidf(train_title,train_body,[title],[body])
    print(title,body)
    new_data_cos=extract_cosine_similarity([title],[body])
    new_data_features = combine_features(new_data_tfidf, new_data_cos)
    y_pred = classifier_NB.predict(new_data_features)
    if(y_pred[0]==0):
        prediction="Fake News"
    else:
        prediction="True News"
    print(prediction)    
    return {
        'prediction': prediction
    }
   
    
    # title=title.tolist()
    # body=new_data['text'].tolist()
    # return {"headline": title, "body": body}
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=4000, debug=True)    