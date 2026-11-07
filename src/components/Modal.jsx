import React, { useEffect, useRef } from "react";

// Contenedor reutilizable para mostrar formularios como diálogo modal nativo.
export default function VentanaModal({ title, close: cerrar, children }) {
  const dialogo = useRef(null);

  // Abre el dialog usando la API nativa cuando el componente se monta.
  useEffect(() => {
    dialogo.current.showModal();
  }, []);

  return (
    <dialog
      ref={dialogo}
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        // Evita el cierre implícito para centralizarlo en la función recibida.
        event.preventDefault();
        cerrar();
      }}
    >
      <div className="dialog-heading">
        <h2 id="dialog-title">{title}</h2>
        {/* Botón visible para cerrar el diálogo sin enviar el formulario. */}
        <button
          type="button"
          className="close-button"
          onClick={cerrar}
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
      {/* El contenido concreto del diálogo lo proporciona el componente padre. */}
      {children}
    </dialog>
  );
}
