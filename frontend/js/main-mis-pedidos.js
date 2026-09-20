// Punto de entrada de mis-pedidos.html.
import { inicializarMisPedidos } from "./mis-pedidos.js";
import { pintarEncabezado } from "./encabezado.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarEncabezado();
  inicializarMisPedidos();
});
