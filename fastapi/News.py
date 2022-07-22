from pydantic import BaseModel
class News(BaseModel):
    headline:object
    body:object