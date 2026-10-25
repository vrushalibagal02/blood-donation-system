
# Our first Python backend

from fastapi import FastAPI

app = FastAPI()

donors = [
    {
        "name": "Aarav",
        "age": 22,
        "blood_group": "O+",
        "city": "Mumbai"
    }
]


@app.get("/")
def home():
    return {"message": "Blood Donation Backend is  working!"}


@app.get("/donors")
def get_donors():
    return donors
