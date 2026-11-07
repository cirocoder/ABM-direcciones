import React from "react";

// Campo genérico: muestra un input normal o un select según la configuración recibida.
export default function Campo({
  field: campo,
  record: registro,
  selection: seleccion,
}) {
  const { name, label, required, wide, placeholder, inputMode, pattern, help } =
    campo;
  return (
    <div className={wide ? "field wide" : "field"}>
      <label htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      {/* Los campos con opciones usan valores controlados por CamposDireccion. */}
      {/* Los demás campos conservan su valor inicial y se envían mediante FormData. */}
      {seleccion ? (
        <select
          id={name}
          name={name}
          required={required}
          value={seleccion.value}
          disabled={seleccion.disabled}
          onChange={(event) => seleccion.change(event.target.value)}
        >
          <option value="" disabled>
            {seleccion.placeholder}
          </option>
          {seleccion.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          required={required}
          defaultValue={registro?.[name] ?? ""}
          placeholder={placeholder}
          inputMode={inputMode}
          pattern={pattern}
          maxLength={240}
          aria-describedby={help ? `${name}-help` : undefined}
        />
      )}
      {/* Muestra la ayuda asociada al campo, si fue configurada. */}
      {help && <small id={`${name}-help`}>{help}</small>}
    </div>
  );
}
