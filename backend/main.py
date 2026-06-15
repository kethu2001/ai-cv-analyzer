from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import cv_routes 

app = FastAPI(title="AI Career Coach API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_routes.router, prefix="/api/cv")

@app.get("/")
def root():
    return {"message": "AI Career Coach API is running!"}