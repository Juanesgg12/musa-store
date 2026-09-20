// Punto de entrada de admin/pedidos.html.
import { protegerRutaAdmin } from "./admin-guard.js";
import { inicializarAdminPedidos } from "./admin-pedidos.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerRutaAdmin()) return;
  inicializarAdminPedidos();
});
