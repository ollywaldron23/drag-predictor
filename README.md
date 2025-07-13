Drag Predictor

![Drag Predictor App](frontend/src/assets/Drag-Predictor-App.png)

Overview:

This app was built as a hands-on project to explore how machine learning can be used to predict physical properties — in this case, drag coefficients for 2D shapes. 

It combines a clean React frontend with SVG-based shape rendering, a Python backend using scikit-learn to train a model, dynamic shape generation with tunable aspect ratios (for ellipses, rectangles, etc.), and a simple ML workflow to simulate real-world predictive modelling.

The aim was to demonstrate integration between frontend and ML backend, visual interactivity for abstract physics concepts, and practical use of Python for fast prototyping in a physics/data context.

Frontend:

React app with a shape carousel and aspect ratio slider. Sends inputs to backend via HTTP POST, displays predicted drag.

Backend:

Python API running a trained ML model for drag coefficient prediction. Receives JSON data, returns predicted drag values.

Additional Info:

Aspect ratio is a unitless numeric parameter influencing shape geometry. 
Demonstrates full-stack integration of React UI with Python ML backend for scientific modeling. 
For evaluation purposes only; not production-ready.
