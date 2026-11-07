import React, { useState } from "react";
import { zonasEntrega, datos as ejercicio } from "../datos.js";
import Campo from "./Campo.jsx";

// Renderiza todos los campos de una dirección y administra ciudad/localidad.
export default function CamposDireccion({ registro }) {
  // Inicializa los selectores con los valores existentes cuando se edita un registro.
  const [ciudad, establecerCiudad] = useState(registro?.city ?? "");
  const [localidad, establecerLocalidad] = useState(registro?.locality ?? "");
  const ciudades = [...zonasEntrega.keys()];
  const localidades = [...(zonasEntrega.get(ciudad) ?? [])];

  // Los registros anteriores podían guardar cualquier ciudad o localidad.
  if (registro?.city && !ciudades.includes(registro.city))
    ciudades.push(registro.city);
  if (
    ciudad === registro?.city &&
    registro?.locality &&
    !localidades.includes(registro.locality)
  ) {
    localidades.push(registro.locality);
  }

  // Define el estado y el comportamiento de los selectores dependientes.
  const selecciones = {
    city: {
      value: ciudad,
      options: ciudades,
      placeholder: "Seleccioná tu ciudad",
      change(value) {
        establecerCiudad(value);
        establecerLocalidad("");
      },
    },
    locality: {
      value: localidad,
      options: localidades,
      placeholder: ciudad
        ? "Seleccioná tu localidad"
        : "Seleccioná una ciudad primero",
      disabled: !ciudad,
      change: establecerLocalidad,
    },
  };

  return (
    <div className="fields">
      {/* La definición de ejercicio.fields determina qué controles se muestran. */}
      {ejercicio.fields.map((campo) => (
        <Campo
          key={campo.name}
          field={campo}
          record={registro}
          selection={selecciones[campo.name]}
        />
      ))}
    </div>
  );
}
