import React from "react";
import Registros from "./components/Registros.jsx";

// Componente raíz de la aplicación: muestra el encabezado y el módulo de direcciones.
export default function App() {
  return (
    <main>
      {/* Presentación principal de la pantalla. */}
      <header>
        <h1>Aplicación de Delivery</h1>
        <p>Sección de direcciones de entrega</p>
      </header>
      {/* Componente que contiene la carga, edición y eliminación de registros. */}
      <Registros />
    </main>
  );
}
