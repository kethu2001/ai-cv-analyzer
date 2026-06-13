import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def analyze_cv(cv_text: str) -> str:
    #prompt send to Gemini
    prompt = f"""
    You are an expert career coach. Analyze this CV and provide:
    1. A brief overall summary (2-3 sentences)
    2. Top 5 strengths
    3. Top 5 skill gaps or areas to improve
    4. 3 specific recommendations to make the CV stronger

    CV Content:
    {cv_text}

    Respond in JSON format like this:
    {{
        "summary": "...",
        "strengths": ["...", "...", "...", "...", "..."],
        "skill_gaps": ["...", "...", "...", "...", "..."],
        "recommendations": ["...", "...", "..."]
    }}
    """
    response = model.generate_content(prompt)
    return response.text

def match_job(cv_text: str, job_description: str) -> str:
    prompt = f"""
    You are an expert recruiter. Compare this CV with the job description and provide:
    1. Match score (0-100)
    2. Matching skills
    3. Missing skills
    4. A personalized cover letter

    CV:
    {cv_text}

    Job Description:
    {job_description}

    Respond in JSON format like this:
    {{
        "match_score": 85,
        "matching_skills": ["...", "..."],
        "missing_skills": ["...", "..."],
        "cover_letter": "..."
    }}
    """
    response = model.generate_content(prompt)
    return response.text