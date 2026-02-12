from fastapi.testclient import TestClient
from main import app
import random
import string

client = TestClient(app)

def generate_random_email():
    return "".join(random.choices(string.ascii_lowercase, k=10)) + "@example.com"

def test_register_and_login():
    email = generate_random_email()
    password = "securepassword"
    name = "Test User"

    # 1. Register
    print(f"Registering user: {email}")
    response = client.post("/register", json={
        "name": name,
        "email": email,
        "password": password
    })
    print(f"Register Response: {response.json()}")
    assert response.status_code == 200
    assert response.json()["message"] == "User registered successfully"

    # 2. Login
    print("Logging in...")
    response = client.post("/login", json={
        "name": name, 
        "email": email,
        "password": password
    })
    print(f"Login Response: {response.json()}")
    assert response.status_code == 200
    assert "token" in response.json()
    token = response.json()["token"]
    print(f"Token received: {token[:20]}...")

    # 3. Login with wrong password
    print("Logging in with wrong password...")
    response = client.post("/login", json={
        "name": name,
        "email": email,
        "password": "wrongpassword"
    })
    print(f"Wrong Password Response: {response.json()}")
    assert response.json()["message"] == "Invalid email or password"

if __name__ == "__main__":
    try:
        test_register_and_login()
        print("\n✅ Authentication flow verified successfully!")
    except AssertionError as e:
        print(f"\n❌ Verification failed: {e}")
    except Exception as e:
        print(f"\n❌ An error occurred: {e}")
