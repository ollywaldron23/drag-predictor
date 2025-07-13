import { useState } from "react";

function App() {
  const [shape, setShape] = useState("circle");
  const [aspectRatio, setAspectRatio] = useState(1.0);
  const [drag, setDrag] = useState(null);
  const [error, setError] = useState(null);

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
    <div>
      <h1>Drag Coefficient Predictor</h1>

      <label>
        Shape:
        <select value={shape} onChange={(e) => setShape(e.target.value)}>
          <option value="circle">Circle</option>
          <option value="ellipse">Ellipse</option>
          <option value="flat_plate">Flat Plate</option>
        </select>
      </label>

      <label>
        Aspect Ratio:
        <input
          type="number"
          step="0.1"
          min="1"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
        />
      </label>

      <button onClick={predictDrag} >
        Predict
      </button>

      {drag !== null && (
        <p>
          Predicted drag coefficient: <strong>{drag}</strong>
        </p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
