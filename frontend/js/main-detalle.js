// Punto de entrada de detalle-producto.html.
import { inicializarDetalle } from "./detalle.js";
import { pintarEncabezado } from "./encabezado.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarEncabezado();
  inicializarDetalle();
});
