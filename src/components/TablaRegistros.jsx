import React from "react";
import { datos as ejercicio } from "../datos.js";

// Presenta los registros guardados y las acciones disponibles para cada uno.
export default function TablaRegistros({ records: registros, open: abrir }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Dirección</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Cada fila representa una dirección persistida. */}
        {registros.map((registro) => (
          <tr key={registro.id}>
            <td>
              <strong>{registro[ejercicio.nameField]}</strong>
              <small>
                {registro.street} {registro.number} · {registro.locality},{" "}
                {registro.city}
              </small>
            </td>
            <td className="row-actions">
              <button
                onClick={() => abrir("edit", registro)}
                aria-label={`Modificar ${registro[ejercicio.nameField]}`}
              >
                Modificar
              </button>
              <button
                className="danger-text"
                onClick={() => abrir("remove", registro)}
                aria-label={`Dar de baja ${registro[ejercicio.nameField]}`}
              >
                Dar de baja
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
