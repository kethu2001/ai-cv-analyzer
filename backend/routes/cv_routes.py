from fastapi import APIRouter, UploadFile, File, Form
from services.cv_parser import extract_text_from_pdf
from services.llm_service import analyze_cv, match_job, generate_interview_questions
from services.db_service import save_analysis, save_match, save_interview, get_history, delete_history
import json
import re

router = APIRouter()

@router.post("/analyze")
async def analyze_cv_route(file: UploadFile = File(...)):
    contents = await file.read()
    cv_text = extract_text_from_pdf(contents)
    result = analyze_cv(cv_text)
    cleaned = re.sub(r"```json|```", "", result).strip()
    parsed = json.loads(cleaned)

    
    save_analysis(file.filename, parsed)
    return parsed

@router.post("/match")
async def match_job_route(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    contents = await file.read()
    cv_text = extract_text_from_pdf(contents)
    result = match_job(cv_text, job_description)
    cleaned = re.sub(r"```json|```", "", result).strip()
    parsed = json.loads(cleaned)
    
    save_match(file.filename, job_description, parsed)
    return parsed

@router.post("/interview")
async def interview_questions_route(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    contents = await file.read()
    cv_text = extract_text_from_pdf(contents)
    result = generate_interview_questions(cv_text, job_description)
    cleaned = re.sub(r"```json|```", "", result).strip()
    parsed = json.loads(cleaned)

    # Save to MongoDB
    save_interview(file.filename, job_description, parsed)
    return parsed

@router.get("/history")
async def get_history_route():
    return get_history()

@router.delete("/history/{record_id}")
async def delete_history_route(record_id: str):
    delete_history(record_id)
    return {"message": "Deleted successfully"}