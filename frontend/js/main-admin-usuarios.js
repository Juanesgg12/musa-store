// Punto de entrada de admin/usuarios.html.
import { protegerRutaAdmin } from "./admin-guard.js";
import { inicializarAdminUsuarios } from "./admin-usuarios.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerRutaAdmin()) return;
  inicializarAdminUsuarios();
});
