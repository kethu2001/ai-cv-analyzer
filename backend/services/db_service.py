from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["careeriq"]

def save_analysis(cv_filename: str, result: dict):
    record = {
        "type": "cv_analysis",
        "cv_filename": cv_filename,
        "result": result,
        "created_at": datetime.now()
    }
    db.history.insert_one(record)

def save_match(cv_filename: str, job_description: str, result: dict):
    record = {
        "type": "job_match",
        "cv_filename": cv_filename,
        "job_description": job_description[:200],  
        "result": result,
        "created_at": datetime.now()
    }
    db.history.insert_one(record)

def save_interview(cv_filename: str, job_description: str, result: dict):
    record = {
        "type": "interview_prep",
        "cv_filename": cv_filename,
        "job_description": job_description[:200],
        "result": result,
        "created_at": datetime.now()
    }
    db.history.insert_one(record)

def get_history():
    records = list(db.history.find().sort("created_at", -1).limit(20))
    # Convert ObjectId to string for JSON 
    for r in records:
        r["_id"] = str(r["_id"])
        r["created_at"] = r["created_at"].strftime("%Y-%m-%d %H:%M")
    return records

def delete_history(record_id: str):
    from bson import ObjectId
    db.history.delete_one({"_id": ObjectId(record_id)})