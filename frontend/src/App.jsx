import { useState, useEffect } from "react";
import "./App.css";
import { CircleShape, EllipseShape, FlatPlateShape, RectangleShape, ParallelogramShape, TriangleShape, HexagonShape, StarShape } from "./components/Shapes";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

function App() {

  const shapes = [
  { name: "circle", Component: CircleShape },
  { name: "ellipse", Component: EllipseShape },
  { name: "flat_plate", Component: FlatPlateShape },
  { name: "rectangle", Component: RectangleShape },
  { name: "parallelogram", Component: ParallelogramShape },
  { name: "triangle", Component: TriangleShape },
  { name: "hexagon", Component: HexagonShape },
  { name: "star", Component: StarShape },
  ];

  const [shape, setShape] = useState("ellipse"); // default shape is ellipse
  const [aspectRatio, setAspectRatio] = useState(2.0);
  const [drag, setDrag] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const newShape = shapes[currentIndex].name;
    setShape(newShape);

    if (newShape !== "ellipse" && newShape !== "rectangle" && newShape !== "parallelogram") {
      setAspectRatio(1.0);  // reset aspect ratio for non-ellipse
    }
  }, [currentIndex, shapes]);

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', '/particles/particles.json', () => {
        console.log('Particles.js loaded');
      });
    }
  }, []);

  const prevShape = () => {
    setCurrentIndex((currentIndex - 1 + shapes.length) % shapes.length);
  };

  const nextShape = () => {
    setCurrentIndex((currentIndex + 1) % shapes.length);
  };

  const CurrentShapeComponent = shapes[currentIndex].Component;

  const predictDrag = async () => {
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shape: shape,
          aspect_ratio: parseFloat(aspectRatio),
        }),                                         // send shape and aspect ratio to backend
      });

      if (!response.ok) {
        throw new Error("Prediction failed.");
      }                                             // check if response is OK

      const data = await response.json();
      setDrag(data.predicted_drag); // set the predicted drag coefficient from the response     
      setError(null);
    } catch (err) {
      setError(err.message);
      setDrag(null);
    }
  };



  return (
    <>
      <div
        id="particles-js"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
    <div class="app-main-div">
      <div class="app-header">
        <h1 class="app-title">Drag Predictor</h1>
        <p class="app-description">
          Predict the drag coefficient for various shapes.
          <br /> 
          Most shapes are fixed, while the ellipse, rectangle and parallelogram shapes allow you to adjust the aspect ratio.
        </p>
      </div>  
      <div class="form-container">  
        <label class="shape-label">
          <div className="shape-carousel">
            <button onClick={prevShape} aria-label="Previous Shape"><IoIosArrowBack /></button>

            <div className="shape-display" onClick={() => setShape(currentShape.name)}>
              <CurrentShapeComponent aspectRatio={aspectRatio} />
            </div>

            <button onClick={nextShape} aria-label="Next Shape"><IoIosArrowForward /></button>
          </div>
        </label>

        <label htmlFor="aspectRatioSlider">Aspect Ratio: {aspectRatio}</label>
        <input
          id="aspectRatioSlider"
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(parseFloat(e.target.value))}
          disabled={shape !== "ellipse" && shape !== "rectangle" && shape !== "parallelogram"} // disable for non-ellipse shapes
        />

        <button onClick={predictDrag} class="predict-button">
          Predict
        </button>

        {drag !== null && (
          <p class="result">
            Predicted Drag Coefficient: <strong>{drag}</strong>
          </p>
      )}

        {error && <p class="error">{error}</p>}
      </div>
    </div>
    </>
  );
}

export default App;
