// Punto de entrada de carrito.html.
import { inicializarCarrito } from "./carrito-vista.js";
import { pintarEncabezado } from "./encabezado.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarEncabezado();
  inicializarCarrito();
});
