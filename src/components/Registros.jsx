import React, { useState } from "react";
import { datos as ejercicio } from "../datos.js";
import DialogoRegistros from "./DialogRegistros.jsx";
import TablaRegistros from "./TablaRegistros.jsx";

// Lee y valida la colección de registros almacenada en el navegador.
function leerRegistros(ejercicio) {
  const datosBrutos = localStorage.getItem(ejercicio.key);
  if (datosBrutos === null) return ejercicio.initial;

  const registrosLeidos = JSON.parse(datosBrutos);
  if (!Array.isArray(registrosLeidos))
    throw new Error("Formato de almacenamiento inválido");
  return registrosLeidos;
}

// Coordina el estado de los registros, el diálogo y los mensajes de la pantalla.
export default function Registros() {
  // Carga los datos una sola vez al inicializar el componente.
  const [guardado, establecerGuardado] = useState(() => {
    try {
      return { records: leerRegistros(ejercicio), error: "" };
    } catch {
      return {
        records: [],
        error: "No se pudieron leer los datos guardados en este navegador.",
      };
    }
  });
  const [accion, establecerAccion] = useState(null);
  const [errorFormulario, establecerErrorFormulario] = useState("");
  const [estado, establecerEstado] = useState("");

  // Abre el diálogo solicitado y limpia mensajes de operaciones anteriores.
  function abrir(modo, registro) {
    establecerErrorFormulario("");
    establecerEstado("");
    establecerAccion({ mode: modo, record: registro });
  }

  // Convierte los datos del formulario en un registro y persiste el resultado.
  function enviar(event) {
    event.preventDefault();
    const { mode: modo, record: registro } = accion;
    const id = registro?.id;
    const valores = Object.fromEntries(
      [...new FormData(event.currentTarget)].map(([clave, valor]) => [
        clave,
        valor.trim(),
      ]),
    );

    try {
      // Se vuelve a leer el almacenamiento para evitar trabajar con datos obsoletos.
      const actuales = leerRegistros(ejercicio);
      if (id && !actuales.some((elemento) => elemento.id === id)) {
        establecerGuardado({ records: actuales, error: "" });
        establecerErrorFormulario("Este registro ya no está disponible.");
        return;
      }

      let siguientes;
      if (modo === "remove") {
        // Elimina únicamente el registro cuyo identificador coincide.
        siguientes = actuales.filter((elemento) => elemento.id !== id);
      } else {
        // Comprueba primero los campos obligatorios y las reglas del ejercicio.
        const faltante = ejercicio.fields.find(
          (campo) => campo.required && !valores[campo.name],
        );
        const error = faltante
          ? `Completá el campo «${faltante.label}».`
          : ejercicio.validate(valores, actuales, id);
        if (error) {
          establecerErrorFormulario(error);
          return;
        }

        siguientes = id
          ? // Conserva el identificador al editar.
            actuales.map((elemento) =>
              elemento.id === id ? { ...valores, id } : elemento,
            )
          : // Genera un identificador nuevo al crear un registro.
            [...actuales, { ...valores, id: crypto.randomUUID() }];
      }

      // Guarda la nueva colección y actualiza la interfaz.
      localStorage.setItem(ejercicio.key, JSON.stringify(siguientes));
      establecerGuardado({ records: siguientes, error: "" });
      establecerAccion(null);
      establecerEstado(
        modo === "remove" ? "Registro dado de baja." : "Cambios guardados.",
      );
    } catch {
      establecerErrorFormulario(
        "No se pudieron guardar los cambios en el almacenamiento del navegador.",
      );
    }
  }

  return (
    <section className="panel" aria-labelledby="section-title">
      <div className="section-heading">
        <div>
          <h2 id="section-title">{ejercicio.title}</h2>
          <p className="muted">{ejercicio.description}</p>
        </div>
        {/* No permite agregar registros si la lectura inicial falló. */}
        <button
          className="primary"
          onClick={() => abrir("add")}
          disabled={Boolean(guardado.error)}
        >
          {ejercicio.add}
        </button>
      </div>

      {guardado.error && (
        <p role="alert" className="error">
          {guardado.error}
        </p>
      )}
      {/* Estado vacío: se muestra solo si no hay error ni registros. */}
      {!guardado.error && guardado.records.length === 0 && (
        <p className="empty">{ejercicio.empty}</p>
      )}
      {/* La tabla aparece cuando existe al menos una dirección. */}
      {guardado.records.length > 0 && (
        <TablaRegistros records={guardado.records} open={abrir} />
      )}
      <p className="status" role="status">
        {estado}
      </p>

      {/* El diálogo se monta únicamente mientras hay una acción activa. */}
      {accion && (
        <DialogoRegistros
          action={accion}
          close={() => establecerAccion(null)}
          submit={enviar}
          formError={errorFormulario}
        />
      )}
    </section>
  );
}
