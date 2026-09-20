// Capa de acceso a la API. Este archivo solo sabe hablar HTTP con el backend;
// no conoce el DOM ni cómo se muestran los datos (eso vive en cada page-script).
import { API_BASE_URL } from "./config.js";
import { obtenerToken } from "./sesion.js";

async function solicitar(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`, opciones);

  if (!respuesta.ok) {
    // El backend manda { message: "..." } en sus errores (MUSA-006 §29).
    // Si por lo que sea no viene, caemos a un texto genérico.
    const cuerpo = await respuesta.json().catch(() => null);
    throw new Error(cuerpo?.message || `Error ${respuesta.status} al llamar ${ruta}`);
  }

  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}

// Manda el token de sesión si hay uno activo. POST /api/pedidos es público
// (funciona sin sesión), pero si el cliente SÍ está logueado, necesitamos
// mandar el token para que el backend asocie el pedido a su cuenta — si no
// lo mandamos, el backend no tiene forma de saber que es el mismo usuario y
// crea el pedido como si fuera de un visitante.
function solicitarConJson(ruta, metodo, datos) {
  const headers = { "Content-Type": "application/json" };
  const token = obtenerToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return solicitar(ruta, {
    method: metodo,
    headers,
    body: JSON.stringify(datos),
  });
}

export function obtenerProductos() {
  return solicitar("/productos");
}

export function obtenerCategorias() {
  return solicitar("/categorias");
}

export function obtenerProductoPorId(id) {
  return solicitar(`/productos/${id}`);
}

export function login(email, password) {
  return solicitarConJson("/auth/login", "POST", { email, password });
}

export function registrar(datos) {
  return solicitarConJson("/auth/register", "POST", datos);
}

export function crearPedido(datos) {
  return solicitarConJson("/pedidos", "POST", datos);
}

// Para GET/DELETE: no mandan cuerpo, pero sí necesitan el token (endpoints
// que requieren estar autenticado, como los de ADMIN o "mis pedidos").
function solicitarAutenticadoSinCuerpo(ruta, metodo = "GET") {
  const headers = {};
  const token = obtenerToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return solicitar(ruta, { method: metodo, headers });
}

export function crearProducto(datos) {
  return solicitarConJson("/productos", "POST", datos);
}

export function actualizarProducto(id, datos) {
  return solicitarConJson(`/productos/${id}`, "PUT", datos);
}

export function eliminarProducto(id) {
  return solicitarAutenticadoSinCuerpo(`/productos/${id}`, "DELETE");
}

export function crearCategoria(datos) {
  return solicitarConJson("/categorias", "POST", datos);
}

export function actualizarCategoria(id, datos) {
  return solicitarConJson(`/categorias/${id}`, "PUT", datos);
}

export function eliminarCategoria(id) {
  return solicitarAutenticadoSinCuerpo(`/categorias/${id}`, "DELETE");
}

export function obtenerPedidosAdmin() {
  return solicitarAutenticadoSinCuerpo("/admin/pedidos");
}

export function obtenerPedidoPorId(id) {
  return solicitarAutenticadoSinCuerpo(`/pedidos/${id}`);
}

export function actualizarEstadoPedido(id, estado) {
  return solicitarConJson(`/pedidos/${id}/estado`, "PUT", { estado });
}

export function obtenerUsuariosAdmin() {
  return solicitarAutenticadoSinCuerpo("/usuarios");
}

export function cambiarRolUsuario(id, rol) {
  return solicitarConJson(`/usuarios/${id}/rol`, "PUT", { rol });
}
