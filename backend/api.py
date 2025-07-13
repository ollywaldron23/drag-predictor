from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# load trained model
model = joblib.load("drag_model.pkl")

# enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# define input schema
class InputData(BaseModel):
    shape: str
    aspect_ratio: float

@app.post("/predict")
def predict(data: InputData):
    # prepare input as DataFrame
    input_df = pd.DataFrame([{
        "shape": data.shape,
        "aspect_ratio": data.aspect_ratio
    }])
    
    # make prediction
    prediction = model.predict(input_df)
    
    # return result
    return {"predicted_drag": round(float(prediction[0]), 4)}