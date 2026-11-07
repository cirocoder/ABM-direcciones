// Ciudades disponibles y sus localidades para los campos dependientes del formulario.
export const zonasEntrega = new Map([
  [
    "Buenos Aires",
    ["Ciudad Autónoma de Buenos Aires", "Avellaneda", "La Plata", "San Isidro"],
  ],
  ["Córdoba", ["Córdoba", "Alta Gracia", "Villa Allende", "Villa Carlos Paz"]],
  ["Mendoza", ["Mendoza", "Godoy Cruz", "Guaymallén", "Las Heras"]],
  ["San Juan", ["San Juan", "Rawson", "Jáchal", "Caucete", "Pocito"]],
  ["Rosario", ["Rosario", "Funes", "Granadero Baigorria", "Pérez"]],
]);

// Configuración reutilizable de los campos que componen una dirección.
const camposDireccion = [
  {
    name: "coordinates",
    label: "Coordenadas",
    required: true,
    wide: true,
    placeholder: "-34.6037, -58.3816",
    help: "Ingresá latitud y longitud separadas por una coma.",
  },
  { name: "street", label: "Calle", required: true, wide: true },
  {
    name: "number",
    label: "Número",
    required: true,
    inputMode: "numeric",
    pattern: "[0-9]+",
  },
  { name: "floor", label: "Piso" },
  { name: "unit", label: "Depto" },
  { name: "city", label: "Ciudad", required: true, wide: true },
  { name: "locality", label: "Localidad", required: true, wide: true },
  { name: "notes", label: "Aclaraciones", wide: true },
  {
    name: "alias",
    label: "Alias",
    required: true,
    wide: true,
    placeholder: "Casa, trabajo…",
  },
];

// Valida el formato y los rangos de las coordenadas, además del número de calle.
function validarDireccion({ coordinates, number }) {
  const partes = coordinates.split(",").map((parte) => parte.trim());
  const [latitud, longitud] = partes.map(Number);
  const expresionDecimal = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/;
  if (
    partes.length !== 2 ||
    !partes.every((parte) => expresionDecimal.test(parte)) ||
    Math.abs(latitud) > 90 ||
    Math.abs(longitud) > 180
  ) {
    return "Ingresá coordenadas válidas. Por ejemplo, -34.6037, -58.3816.";
  }
  if (!/^\d+$/.test(number)) return "Ingresá un número de calle válido.";
  return "";
}

// Configuración general de los datos consumida por los componentes de la interfaz.
export const datos = {
  key: "direcciones",
  title: "Direcciones",
  description: "Administrá tus direcciones de entrega.",
  nameField: "alias",
  add: "Agregar dirección",
  edit: "Modificar dirección",
  remove: "Baja de dirección",
  empty: "Agregá tu primera dirección de entrega.",
  fields: camposDireccion,
  initial: [],
  validate: validarDireccion,
};
