// Lógica del panel de administración de categorías: listar, crear, editar,
// desactivar/reactivar. Los endpoints POST/PUT/DELETE de /api/categorias
// exigen rol ADMIN — el backend ya lo hace cumplir; este archivo solo arma
// la interfaz para usarlos.
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "./api.js";
import { cerrarSesion } from "./sesion.js";

export async function inicializarAdminCategorias() {
  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../index.html";
  });

  document.getElementById("btn-nueva").addEventListener("click", () => mostrarFormulario());
  document.getElementById("btn-cancelar").addEventListener("click", () => ocultarFormulario());
  document.getElementById("form-categoria").addEventListener("submit", manejarGuardar);

  await cargarCategorias();
}

async function cargarCategorias() {
  const cuerpoTabla = document.getElementById("tabla-categorias-cuerpo");
  const mensaje = document.getElementById("mensaje-categorias");
  mensaje.innerHTML = "";

  try {
    const categorias = await obtenerCategorias();
    cuerpoTabla.innerHTML = "";
    categorias.forEach((categoria) => cuerpoTabla.appendChild(crearFilaCategoria(categoria)));
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function crearFilaCategoria(categoria) {
  const fila = document.createElement("tr");

  const tdNombre = document.createElement("td");
  tdNombre.textContent = categoria.nombre;

  const tdDescripcion = document.createElement("td");
  tdDescripcion.textContent = categoria.descripcion || "—";

  const tdEstado = document.createElement("td");
  const insignia = document.createElement("span");
  insignia.className = `insignia-estado ${categoria.activo ? "insignia-estado--activo" : "insignia-estado--inactivo"}`;
  insignia.textContent = categoria.activo ? "Activa" : "Inactiva";
  tdEstado.appendChild(insignia);

  const tdAcciones = document.createElement("td");
  const contenedorAcciones = document.createElement("div");
  contenedorAcciones.className = "admin-acciones";

  const botonEditar = document.createElement("button");
  botonEditar.type = "button";
  botonEditar.className = "boton-enlace";
  botonEditar.textContent = "Editar";
  botonEditar.addEventListener("click", () => mostrarFormulario(categoria));

  const botonEstado = document.createElement("button");
  botonEstado.type = "button";
  botonEstado.className = "boton-enlace";
  botonEstado.textContent = categoria.activo ? "Desactivar" : "Reactivar";
  botonEstado.addEventListener("click", () => alternarEstado(categoria));

  contenedorAcciones.append(botonEditar, botonEstado);
  tdAcciones.appendChild(contenedorAcciones);

  fila.append(tdNombre, tdDescripcion, tdEstado, tdAcciones);
  return fila;
}

function mostrarFormulario(categoria = null) {
  document.getElementById("panel-formulario").classList.add("visible");
  document.getElementById("titulo-formulario").textContent = categoria ? "Editar categoría" : "Nueva categoría";
  document.getElementById("mensaje-formulario-categoria").innerHTML = "";

  document.getElementById("categoria-id").value = categoria?.id || "";
  document.getElementById("categoria-nombre").value = categoria?.nombre || "";
  document.getElementById("categoria-descripcion").value = categoria?.descripcion || "";
  document.getElementById("categoria-imagen").value = categoria?.imagen || "";
  document.getElementById("categoria-activo").checked = categoria ? categoria.activo : true;
}

function ocultarFormulario() {
  document.getElementById("panel-formulario").classList.remove("visible");
  document.getElementById("form-categoria").reset();
}

async function manejarGuardar(evento) {
  evento.preventDefault();
  const boton = evento.target.querySelector('button[type="submit"]');
  const mensajeFormulario = document.getElementById("mensaje-formulario-categoria");
  boton.disabled = true;

  const id = document.getElementById("categoria-id").value;
  const datos = {
    nombre: document.getElementById("categoria-nombre").value,
    descripcion: document.getElementById("categoria-descripcion").value || null,
    imagen: document.getElementById("categoria-imagen").value || null,
    activo: document.getElementById("categoria-activo").checked,
  };

  try {
    if (id) {
      await actualizarCategoria(id, datos);
    } else {
      await crearCategoria(datos);
    }
    ocultarFormulario();
    await cargarCategorias();
  } catch (error) {
    mostrarMensaje(mensajeFormulario, error.message, "error");
  } finally {
    boton.disabled = false;
  }
}

async function alternarEstado(categoria) {
  const mensaje = document.getElementById("mensaje-categorias");
  try {
    if (categoria.activo) {
      await eliminarCategoria(categoria.id);
    } else {
      await actualizarCategoria(categoria.id, {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        imagen: categoria.imagen,
        activo: true,
      });
    }
    await cargarCategorias();
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
