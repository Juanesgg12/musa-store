// Maneja dónde vive la sesión del usuario en el navegador (localStorage).
// Ningún otro archivo debería llamar a localStorage directamente para esto:
// si algún día cambiamos la estrategia de almacenamiento, solo se toca aquí.
//
// Nota de seguridad: guardar el JWT en localStorage es práctico (persiste entre
// pestañas y recargas), pero es legible por cualquier script que corra en la
// página — si algún día la app tuviera una vulnerabilidad XSS, el token podría
// robarse. Es una decisión razonable para esta etapa del proyecto; si Musa
// maneja datos más sensibles en el futuro, vale la pena reconsiderarlo.

const CLAVE_TOKEN = "musa_token";
const CLAVE_USUARIO = "musa_usuario";

export function guardarSesion(token, usuario) {
  localStorage.setItem(CLAVE_TOKEN, token);
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
}

export function obtenerToken() {
  return localStorage.getItem(CLAVE_TOKEN);
}

export function obtenerUsuario() {
  const crudo = localStorage.getItem(CLAVE_USUARIO);
  return crudo ? JSON.parse(crudo) : null;
}

export function haySesionActiva() {
  return obtenerToken() !== null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_TOKEN);
  localStorage.removeItem(CLAVE_USUARIO);
}
