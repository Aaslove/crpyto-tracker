import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CrpytoContext from "./Context/CrpytoContext.jsx";
import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CrpytoContext>
    <App />
  </CrpytoContext>
);
