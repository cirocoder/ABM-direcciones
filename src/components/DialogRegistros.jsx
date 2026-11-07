import React from "react";
import { datos as ejercicio } from "../datos.js";
import VentanaModal from "./Modal.jsx";
import CamposDireccion from "./CamposDireccion.jsx";

// Dialog compartido para agregar, editar o eliminar una dirección.
export default function DialogoRegistros({
  action: accion,
  close: cerrar,
  submit: enviar,
  formError: errorFormulario,
}) {
  return (
    <VentanaModal title={ejercicio[accion.mode]} close={cerrar}>
      <form onSubmit={enviar}>
        {/* La baja pide confirmación; agregar y editar muestran el formulario. */}
        {accion.mode === "remove" ? (
          <p>
            ¿Confirmás la baja de{" "}
            <strong>{accion.record[ejercicio.nameField]}</strong>?
          </p>
        ) : (
          <CamposDireccion registro={accion.record} />
        )}
        {/* Los errores se anuncian visualmente y a lectores de pantalla. */}
        {errorFormulario && (
          <p className="error" role="alert">
            {errorFormulario}
          </p>
        )}
        <div className="dialog-actions">
          {/* Cancelar siempre cierra sin modificar los datos. */}
          <button type="button" onClick={cerrar}>
            Cancelar
          </button>
          <button
            type="submit"
            className={accion.mode === "remove" ? "danger" : "primary"}
          >
            {/* El texto y el estilo distinguen una baja de un guardado. */}
            {accion.mode === "remove" ? "Confirmar baja" : "Guardar"}
          </button>
        </div>
      </form>
    </VentanaModal>
  );
}
