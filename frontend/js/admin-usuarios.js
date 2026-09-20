// Lógica del panel de administración de usuarios: listar y cambiar de rol
// (CLIENTE <-> ADMIN). GET/PUT ya exigen ADMIN en el backend.
import { obtenerUsuariosAdmin, cambiarRolUsuario } from "./api.js";
import { cerrarSesion, obtenerUsuario } from "./sesion.js";

export async function inicializarAdminUsuarios() {
  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../index.html";
  });

  await cargarUsuarios();
}

async function cargarUsuarios() {
  const cuerpoTabla = document.getElementById("tabla-usuarios-cuerpo");
  const mensaje = document.getElementById("mensaje-usuarios");
  mensaje.innerHTML = "";

  try {
    const usuarios = await obtenerUsuariosAdmin();
    const miId = obtenerUsuario().id;

    cuerpoTabla.innerHTML = "";
    usuarios.forEach((usuario) => cuerpoTabla.appendChild(crearFilaUsuario(usuario, miId)));
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function crearFilaUsuario(usuario, miId) {
  const fila = document.createElement("tr");

  const tdNombre = document.createElement("td");
  tdNombre.textContent = `${usuario.nombre} ${usuario.apellido}`;

  const tdEmail = document.createElement("td");
  tdEmail.textContent = usuario.email;

  const tdRol = document.createElement("td");
  const insignia = document.createElement("span");
  insignia.className = `insignia-estado${usuario.rol === "ADMIN" ? " insignia-estado--activo" : ""}`;
  insignia.textContent = usuario.rol;
  tdRol.appendChild(insignia);

  const tdAcciones = document.createElement("td");

  if (usuario.id === miId) {
    // Evita que un admin se quite el rol a sí mismo por accidente y se
    // quede sin forma de volver a entrar al panel.
    const nota = document.createElement("span");
    nota.className = "texto-suave";
    nota.textContent = "(tu cuenta)";
    tdAcciones.appendChild(nota);
  } else {
    const nuevoRol = usuario.rol === "ADMIN" ? "CLIENTE" : "ADMIN";
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-enlace";
    boton.textContent = `Hacer ${nuevoRol}`;
    boton.addEventListener("click", () => manejarCambiarRol(usuario.id, nuevoRol));
    tdAcciones.appendChild(boton);
  }

  fila.append(tdNombre, tdEmail, tdRol, tdAcciones);
  return fila;
}

async function manejarCambiarRol(id, nuevoRol) {
  const mensaje = document.getElementById("mensaje-usuarios");
  try {
    await cambiarRolUsuario(id, nuevoRol);
    await cargarUsuarios();
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function mostrarMensaje(contenedor, texto, tipo) {
  contenedor.innerHTML = "";
  const parrafo = document.createElement("p");
  parrafo.className = `mensaje-formulario mensaje-formulario--${tipo}`;
  parrafo.textContent = texto;
  contenedor.appendChild(parrafo);
}
