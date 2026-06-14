from fastapi import APIRouter, UploadFile, File, Form
from services.cv_parser import extract_text_from_pdf
from services.llm_service import analyze_cv, match_job, generate_interview_questions
import json
import re

router = APIRouter()

# Frontend uploads CV → backend analyzes it → returns results
@router.post("/analyze")
async def analyze_cv_route(file: UploadFile = File(...)):
    contents = await file.read()          # Read uploaded PDF
    cv_text = extract_text_from_pdf(contents)  # Extract text
    result = analyze_cv(cv_text)          # Send to Gemini AI
    cleaned = re.sub(r"```json|```", "", result).strip()  # Clean response
    return json.loads(cleaned)            # Return as JSON


# Frontend uploads CV + job description → backend matches them
@router.post("/match")
async def match_job_route(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    contents = await file.read()
    cv_text = extract_text_from_pdf(contents)
    result = match_job(cv_text, job_description)
    cleaned = re.sub(r"```json|```", "", result).strip()
    return json.loads(cleaned)

# Generate interview questions based on CV + job description
@router.post("/interview")
async def interview_questions_route(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    contents = await file.read()
    cv_text = extract_text_from_pdf(contents)
    result = generate_interview_questions(cv_text, job_description)
    cleaned = re.sub(r"```json|```", "", result).strip()
    return json.loads(cleaned)