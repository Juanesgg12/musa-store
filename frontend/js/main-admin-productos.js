// Punto de entrada de admin/productos.html.
import { protegerRutaAdmin } from "./admin-guard.js";
import { inicializarAdminProductos } from "./admin-productos.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerRutaAdmin()) return;
  inicializarAdminProductos();
});
