from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend local dev if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Item model (if you want to post some data too)
class Item(BaseModel):
    name: str


# Your big target list
from targets_data import targets  # assuming you saved your huge list as `targets` in targets_data.py

@app.post("/targets/")
def get_targets(item: Item):
    return {
        "message": f"Item '{item.name}' received successfully!",
        "data_received": item,
        "targets": targets
    }
