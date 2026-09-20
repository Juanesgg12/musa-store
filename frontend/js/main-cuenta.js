// Punto de entrada de cuenta.html.
import { inicializarAuth } from "./auth.js";
import { pintarEncabezado } from "./encabezado.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarEncabezado();
  inicializarAuth();
});
