import os
import certifi
from pymongo import MongoClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb+srv://shakshisen35600_db_user:WrIOXsl7l8fq0BAh@cluster0.r6dridz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

class MockCollection:
    def __init__(self):
        self.data = []

    def insert_one(self, document):
        self.data.append(document)
        return True

    def find(self, query={}, projection=None):
        # Simple mock find - returns all data for now or filters by simple equality
        if not query:
            return self.data
        
        filtered = []
        for doc in self.data:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                filtered.append(doc)
        return filtered

    def find_one(self, query={}):
        results = self.find(query)
        return results[0] if results else None

try:
    if not MONGO_URL:
        raise ValueError("MONGO_URL is not set")
        
    client = MongoClient(
        MONGO_URL,
        tls=True,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000
    )
    # MongoDB Connected (Lazy connection)
    client.admin.command('ping') # Test if credentials are valid immediately
    db = client["studydb"]
    study_collection = db["studylogs"]
    users_collection = db["users"]
    
except Exception as e:
    error_msg = str(e)
    if "auth" in error_msg.lower():
        print("❌ DATABASE AUTHENTICATION FAILED!")
        print("REASON: The username or password in your MONGO_URL is incorrect.")
    else:
        print(f"❌ DATABASE CONNECTION ERROR: {error_msg}")
        
    print("⚠️ FALLBACK: Using Mock Database so the site keeps running.")
    # Fallback to in-memory storage with MockCollection
    users_collection = MockCollection()
    study_collection = MockCollection()

print("Database initialized")
