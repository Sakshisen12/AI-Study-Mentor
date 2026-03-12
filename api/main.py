from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import pickle
import jwt
import os
try:
    from .database import study_collection, users_collection
except (ImportError, ValueError):
    from database import study_collection, users_collection

# SECRET_KEY
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key_here")
app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"🔥 Global Crash: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"},
    )

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Load model with fallback
try:
    model = pickle.load(open("model.pkl", "rb"))
    print("✅ Model loaded")
except:
    model = None
    print("⚠️ No model - using default predictions")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-study-mentor-six.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email: str = payload.get("email")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api")
@app.get("/")
def home():
    return {"message": "AI Study Mentor Backend ✅"}

class User(BaseModel):
    name: str
    email: str
    password: str

@app.post("/api/register")
@app.post("/register")
def register(user: User):
    # Check existing user
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Save user (mock hash for demo)
    user_dict = user.dict()
    users_collection.insert_one(user_dict)
    
    print(f"✅ Registered: {user.email}")
    return {"message": "User registered successfully", "token": "demo-jwt-token"}

@app.post("/api/login")
@app.post("/login")
def login(user: User):
    db_user = users_collection.find_one({"email": user.email})
    if db_user and db_user["password"] == user.password:
        token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm="HS256")
        return {"token": token, "name": db_user["name"]}
    
    raise HTTPException(status_code=400, detail="Invalid email or password")
@app.post("/api/logout")
@app.post("/logout")
def logout():
    """Logout endpoint - frontend clears token on response"""
    return {"message": "Logged out successfully"}


class StudyLog(BaseModel):
    subject: str
    topic: str
    studyTime: int
    difficulty: int
    confidence: int
    date: str

@app.post("/api/studylog")
@app.post("/studylog")
def save_study_log(data: StudyLog, user_email: str = Depends(get_current_user)):
    # ML Prediction (fallback if no model)
    if model:
        prediction = float(model.predict([[data.studyTime, data.confidence, data.difficulty]])[0])
    else:
        prediction = 75.0 - (data.difficulty * 5) + (data.confidence * 3)
    
    study_data = data.dict()
    study_data["predicted_score"] = prediction
    study_data["user_email"] = user_email # Associate with user
    
    # Save to MongoDB
    study_collection.insert_one(study_data)
    
    print(f"📚 Saved for {user_email}: {data.subject} - Score: {prediction:.1f}")
    return {"message": "Study log saved", "predicted_score": prediction}

@app.get("/api/studylog")
@app.get("/studylog")
def get_study_logs(user_email: str = Depends(get_current_user)):
    logs = list(study_collection.find({"user_email": user_email}, {"_id": 0})) # Filter by user
    return logs

@app.get("/api/recommendation")
@app.get("/recommendation")
def get_recommendation(user_email: str = Depends(get_current_user)):
    logs = list(study_collection.find({"user_email": user_email}, {"_id": 0})) # Filter by user
    
    if not logs:
        return {"recommendation": "Log your first study session!"}
    
    # Find lowest score subject
    lowest = min(logs, key=lambda x: x.get("predicted_score", 999))
    return {
        "recommendation": f"📖 Study {lowest['subject']} ({lowest['topic']})",
        "reason": f"Lowest predicted score: {lowest['predicted_score']:.1f}",
        "score": lowest['predicted_score']
    }
