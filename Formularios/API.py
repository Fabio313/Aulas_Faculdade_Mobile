from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from datetime import date
from pymongo import MongoClient

app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client["testdb"]
users_collection = db["users"]

class User(BaseModel):
    name: str
    email: str
    age: int
    gender: str
    date_of_birth: Optional[date]

@app.post("/users/")
def create_user(user: User):
    user_data = user.model_dump()
    users_collection.insert_one(user_data)
    return {"message": "Usuário criado com sucesso!"}
