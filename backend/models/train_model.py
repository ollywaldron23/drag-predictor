import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import joblib

# 1. Generate dataset
def generate_dataset(n=300):
    data = []

    for _ in range(n):
        shape = np.random.choice(["circle", "ellipse", "flat_plate"]) # randomly picks one of 3 shapes

        if shape == "circle":
            aspect_ratio = 1.0
            drag = 0.47
        elif shape == "flat_plate":
            aspect_ratio = 1.0  # not meaningful, just for input consistency
            drag = 1.28
        elif shape == "ellipse":
            aspect_ratio = np.round(np.random.uniform(1.1, 3.0), 2)
            # approximate drag increases with aspect ratio
            drag = 0.47 + (aspect_ratio - 1) * 0.4  # linear interpolation

        data.append({
            "shape": shape,
            "aspect_ratio": aspect_ratio,
            "drag_coefficient": drag
        })  # append the generated data

    return pd.DataFrame(data)

# 2. Build and train model
def train_model(df):
    X = df[["shape", "aspect_ratio"]] # input
    y = df["drag_coefficient"] # output

    # OneHotEncoder to turn shape type into numbers
    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(), ["shape"]),
            ("num", "passthrough", ["aspect_ratio"])
        ]
    )

    model = Pipeline(steps=[
        ("preprocessor", preprocessor), # process inputs
        ("regressor", LinearRegression()) # train a linear regression model
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) # train and test

    model.fit(X_train, y_train) # train the model on training data
    y_pred = model.predict(X_test) # predict outputs for test data

    mse = mean_squared_error(y_test, y_pred) # compute mean squared error on predictions
    print(f"Model trained. Test MSE: {mse:.4f}") # print the MSE result

    return model

# 3. Save model to be used later
def save_model(model, path="./drag_model.pkl"):
    joblib.dump(model, path)
    print(f"Model saved to {path}")

if __name__ == "__main__":
    df = generate_dataset()
    model = train_model(df)
    save_model(model)
