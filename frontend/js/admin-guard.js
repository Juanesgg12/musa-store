// Protege las páginas de administración en el navegador: si no hay sesión o
// el usuario no es ADMIN, redirige. Esto es solo conveniencia de UX — la
// seguridad de verdad ya la aplica el backend en cada endpoint (MUSA-004 §16:
// "el frontend puede ocultar botones administrativos, pero eso no es
// seguridad"). Si alguien se salta este guard, cada llamada a la API de
// todas formas sería rechazada con 401/403.
import { haySesionActiva, obtenerUsuario } from "./sesion.js";

export function protegerRutaAdmin() {
  if (!haySesionActiva()) {
    window.location.href = "../cuenta.html";
    return null;
  }

  const usuario = obtenerUsuario();
  if (usuario.rol !== "ADMIN") {
    window.location.href = "../index.html";
    return null;
  }

  return usuario;
}
