// Punto de entrada de admin/categorias.html.
import { protegerRutaAdmin } from "./admin-guard.js";
import { inicializarAdminCategorias } from "./admin-categorias.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerRutaAdmin()) return;
  inicializarAdminCategorias();
});
