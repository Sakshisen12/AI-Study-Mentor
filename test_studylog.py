import requests

try:
    res = requests.post("http://localhost:8000/api/register", json={"name":"test", "email":"testz@test.com", "password":"test"})
    print("Register:", res.json())
except Exception as e:
    pass

res = requests.post("http://localhost:8000/api/login", json={"name":"test", "email":"testz@test.com", "password":"test"})
token = res.json()["token"]

res = requests.post("http://localhost:8000/api/studylog", 
    headers={"Authorization": f"Bearer {token}"},
    json={"subject":"math", "topic":"algebra", "studyTime":60, "difficulty":3, "confidence":4, "date":"2023-01-01"}
)
print("Log Response:", res.status_code, res.text)
