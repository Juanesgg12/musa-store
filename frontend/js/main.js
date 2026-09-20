// Punto de entrada del frontend. Cada página tendrá su propio archivo "main"
// que decide qué inicializar; index.html usa este.
import { inicializarCatalogo } from "./catalogo.js";
import { pintarEncabezado } from "./encabezado.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarEncabezado();
  inicializarCatalogo();
});
