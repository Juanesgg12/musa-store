// Lógica del panel de administración de productos: listar, crear, editar,
// desactivar/reactivar. Igual que en categorías, la seguridad real está en
// el backend (POST/PUT/DELETE /api/productos exigen ADMIN).
import {
  obtenerProductos,
  obtenerCategorias,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./api.js";
import { cerrarSesion } from "./sesion.js";
import { formatearPrecio } from "./formato.js";

let categoriasCache = [];

export async function inicializarAdminProductos() {
  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../index.html";
  });

  document.getElementById("btn-nuevo").addEventListener("click", () => mostrarFormulario());
  document.getElementById("btn-cancelar").addEventListener("click", () => ocultarFormulario());
  document.getElementById("form-producto").addEventListener("submit", manejarGuardar);

  categoriasCache = await obtenerCategorias();
  llenarSelectCategorias();
  await cargarProductos();
}

function llenarSelectCategorias() {
  const select = document.getElementById("producto-categoria");
  select.innerHTML = "";
  categoriasCache.forEach((categoria) => {
    const opcion = document.createElement("option");
    opcion.value = categoria.id;
    opcion.textContent = categoria.nombre;
    select.appendChild(opcion);
  });
}

async function cargarProductos() {
  const cuerpoTabla = document.getElementById("tabla-productos-cuerpo");
  const mensaje = document.getElementById("mensaje-productos");
  mensaje.innerHTML = "";

  try {
    const productos = await obtenerProductos();
    cuerpoTabla.innerHTML = "";
    productos.forEach((producto) => cuerpoTabla.appendChild(crearFilaProducto(producto)));
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function crearFilaProducto(producto) {
  const fila = document.createElement("tr");

  const tdNombre = document.createElement("td");
  tdNombre.textContent = producto.nombre;

  const tdCategoria = document.createElement("td");
  tdCategoria.textContent = producto.categoria.nombre;

  const tdPrecio = document.createElement("td");
  tdPrecio.textContent = formatearPrecio(producto.precio);

  const tdStock = document.createElement("td");
  tdStock.textContent = producto.stock;

  const tdPersonalizable = document.createElement("td");
  tdPersonalizable.textContent = producto.personalizable ? "Sí" : "No";

  const tdEstado = document.createElement("td");
  const insignia = document.createElement("span");
  insignia.className = `insignia-estado ${producto.activo ? "insignia-estado--activo" : "insignia-estado--inactivo"}`;
  insignia.textContent = producto.activo ? "Activo" : "Inactivo";
  tdEstado.appendChild(insignia);

  const tdAcciones = document.createElement("td");
  const contenedorAcciones = document.createElement("div");
  contenedorAcciones.className = "admin-acciones";

  const botonEditar = document.createElement("button");
  botonEditar.type = "button";
  botonEditar.className = "boton-enlace";
  botonEditar.textContent = "Editar";
  botonEditar.addEventListener("click", () => mostrarFormulario(producto));

  const botonEstado = document.createElement("button");
  botonEstado.type = "button";
  botonEstado.className = "boton-enlace";
  botonEstado.textContent = producto.activo ? "Desactivar" : "Reactivar";
  botonEstado.addEventListener("click", () => alternarEstado(producto));

  contenedorAcciones.append(botonEditar, botonEstado);
  tdAcciones.appendChild(contenedorAcciones);

  fila.append(tdNombre, tdCategoria, tdPrecio, tdStock, tdPersonalizable, tdEstado, tdAcciones);
  return fila;
}

function mostrarFormulario(producto = null) {
  document.getElementById("panel-formulario").classList.add("visible");
  document.getElementById("titulo-formulario").textContent = producto ? "Editar producto" : "Nuevo producto";
  document.getElementById("mensaje-formulario-producto").innerHTML = "";

  document.getElementById("producto-id").value = producto?.id || "";
  document.getElementById("producto-nombre").value = producto?.nombre || "";
  document.getElementById("producto-descripcion").value = producto?.descripcion || "";
  document.getElementById("producto-precio").value = producto?.precio ?? "";
  document.getElementById("producto-stock").value = producto?.stock ?? "";
  document.getElementById("producto-personalizable").checked = producto?.personalizable || false;
  document.getElementById("producto-activo").checked = producto ? producto.activo : true;
  document.getElementById("producto-categoria").value = producto?.categoria?.id || categoriasCache[0]?.id || "";
}

function ocultarFormulario() {
  document.getElementById("panel-formulario").classList.remove("visible");
  document.getElementById("form-producto").reset();
}

async function manejarGuardar(evento) {
  evento.preventDefault();
  const boton = evento.target.querySelector('button[type="submit"]');
  const mensajeFormulario = document.getElementById("mensaje-formulario-producto");
  boton.disabled = true;

  const id = document.getElementById("producto-id").value;
  const datos = {
    nombre: document.getElementById("producto-nombre").value,
    descripcion: document.getElementById("producto-descripcion").value || null,
    precio: Number(document.getElementById("producto-precio").value),
    stock: Number(document.getElementById("producto-stock").value),
    personalizable: document.getElementById("producto-personalizable").checked,
    activo: document.getElementById("producto-activo").checked,
    categoriaId: Number(document.getElementById("producto-categoria").value),
  };

  try {
    if (id) {
      await actualizarProducto(id, datos);
    } else {
      await crearProducto(datos);
    }
    ocultarFormulario();
    await cargarProductos();
  } catch (error) {
    mostrarMensaje(mensajeFormulario, error.message, "error");
  } finally {
    boton.disabled = false;
  }
}

async function alternarEstado(producto) {
  const mensaje = document.getElementById("mensaje-productos");
  try {
    if (producto.activo) {
      await eliminarProducto(producto.id);
    } else {
      await actualizarProducto(producto.id, {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        personalizable: producto.personalizable,
        activo: true,
        categoriaId: producto.categoria.id,
      });
    }
    await cargarProductos();
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
