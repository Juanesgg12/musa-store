// Punto de entrada de admin/ventas.html.
import { protegerRutaAdmin } from "./admin-guard.js";
import { inicializarAdminVentas } from "./admin-ventas.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerRutaAdmin()) return;
  inicializarAdminVentas();
});
