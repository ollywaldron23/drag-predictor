Drag Predictor

![Drag Predictor App](frontend/src/assets/Drag-Predictor-App.png)


Overview:

A React frontend with a Python backend implementing machine learning to predict drag coefficients for 2D shapes based on shape type and aspect ratio.


Frontend:

React app with a shape carousel and aspect ratio slider
Sends inputs to backend via HTTP POST, displays predicted drag


Backend:

Python API running a trained ML model for drag coefficient prediction
Receives JSON data, returns predicted drag values


Additional Info:

Aspect ratio is a unitless numeric parameter influencing shape geometry
Demonstrates full-stack integration of React UI with Python ML backend for scientific modeling
For evaluation purposes only; not production-ready
