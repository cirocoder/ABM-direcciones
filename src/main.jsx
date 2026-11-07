import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Busca el elemento raíz del HTML y monta allí toda la aplicación React.
createRoot(document.getElementById("root")).render(<App />);
