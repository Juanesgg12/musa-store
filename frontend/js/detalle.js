// Lógica de la página de detalle de producto: carga el producto (por ?id= en
// la URL), lo muestra, y si es personalizable arma el formulario de
// personalización antes de agregarlo al carrito.
import { obtenerProductoPorId } from "./api.js";
import { agregarAlCarrito } from "./carrito.js";
import { pintarEncabezado } from "./encabezado.js";
import { formatearPrecio } from "./formato.js";

export async function inicializarDetalle() {
  const contenedor = document.getElementById("detalle-producto");
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    contenedor.innerHTML = mensajeEstado("No se especificó un producto.", true);
    return;
  }

  try {
    const producto = await obtenerProductoPorId(id);
    renderizarProducto(producto, contenedor);
  } catch (error) {
    console.error("Error cargando el producto:", error);
    contenedor.innerHTML = mensajeEstado("No se pudo cargar el producto.", true);
  }
}

function renderizarProducto(producto, contenedor) {
  contenedor.className = "detalle-producto";
  contenedor.innerHTML = "";

  const imagen = document.createElement("div");
  imagen.className = "detalle-producto__imagen";
  imagen.textContent = "Sin imagen";

  const info = document.createElement("div");

  const categoria = document.createElement("p");
  categoria.className = "detalle-producto__categoria";
  categoria.textContent = producto.categoria.nombre;

  const nombre = document.createElement("h1");
  nombre.className = "detalle-producto__nombre";
  nombre.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.className = "detalle-producto__precio";
  precio.textContent = formatearPrecio(producto.precio);

  const descripcion = document.createElement("p");
  descripcion.className = "detalle-producto__descripcion";
  descripcion.textContent = producto.descripcion || "Sin descripción disponible.";

  info.append(categoria, nombre, precio, descripcion);

  let obtenerPersonalizacion = () => null;
  if (producto.personalizable) {
    const { elemento, obtenerValores } = crearFormularioPersonalizacion();
    info.appendChild(elemento);
    obtenerPersonalizacion = obtenerValores;
  }

  const { elemento: campoCantidad, obtenerCantidad } = crearCampoCantidad();
  info.appendChild(campoCantidad);

  const mensajeAgregado = document.createElement("div");

  const botonAgregar = document.createElement("button");
  botonAgregar.type = "button";
  botonAgregar.className = "boton-primario";
  botonAgregar.textContent = "Agregar al carrito";
  botonAgregar.addEventListener("click", () => {
    agregarAlCarrito({
      productoId: producto.id,
      nombre: producto.nombre,
      precioUnitario: producto.precio,
      cantidad: obtenerCantidad(),
      personalizacion: obtenerPersonalizacion(),
    });

    pintarEncabezado();
    mostrarConfirmacion(mensajeAgregado);
  });

  info.append(botonAgregar, mensajeAgregado);
  contenedor.append(imagen, info);
}

function crearFormularioPersonalizacion() {
  const caja = document.createElement("div");
  caja.className = "detalle-producto__personalizacion";

  const titulo = document.createElement("p");
  titulo.className = "detalle-producto__personalizacion-titulo";
  titulo.textContent = "Personaliza tu producto";
  caja.appendChild(titulo);

  const campoOcasion = crearCampoTexto("Ocasión (ej. Cumpleaños)", "ocasion");
  const campoNombre = crearCampoTexto("Nombre a incluir", "nombre-personalizacion");
  const campoMensaje = crearCampoTexto("Mensaje", "mensaje");
  const campoInstrucciones = crearCampoTexto("Instrucciones adicionales", "instrucciones");

  caja.append(
    campoOcasion.elemento,
    campoNombre.elemento,
    campoMensaje.elemento,
    campoInstrucciones.elemento
  );

  const obtenerValores = () => {
    const valores = {
      ocasion: campoOcasion.input.value.trim() || null,
      nombre: campoNombre.input.value.trim() || null,
      mensaje: campoMensaje.input.value.trim() || null,
      instrucciones: campoInstrucciones.input.value.trim() || null,
    };
    const tieneAlgunDato = Object.values(valores).some((v) => v !== null);
    return tieneAlgunDato ? valores : null;
  };

  return { elemento: caja, obtenerValores };
}

function crearCampoTexto(etiquetaTexto, idCampo) {
  const contenedor = document.createElement("div");
  contenedor.className = "campo";

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", idCampo);
  etiqueta.textContent = etiquetaTexto;

  const input = document.createElement("input");
  input.type = "text";
  input.id = idCampo;

  contenedor.append(etiqueta, input);
  return { elemento: contenedor, input };
}

function crearCampoCantidad() {
  const contenedor = document.createElement("div");
  contenedor.className = "campo-cantidad";

  const etiqueta = document.createElement("label");
  etiqueta.textContent = "Cantidad";
  etiqueta.setAttribute("for", "cantidad");

  const input = document.createElement("input");
  input.type = "number";
  input.id = "cantidad";
  input.min = "1";
  input.value = "1";

  contenedor.append(etiqueta, input);

  const obtenerCantidad = () => Math.max(1, parseInt(input.value, 10) || 1);
  return { elemento: contenedor, obtenerCantidad };
}

function mostrarConfirmacion(contenedor) {
  contenedor.innerHTML = "";
  const aviso = document.createElement("p");
  aviso.className = "mensaje-formulario mensaje-formulario--exito";
  aviso.textContent = "Se agregó al carrito.";
  contenedor.appendChild(aviso);
}

// mensajeEstado solo recibe textos fijos definidos en este archivo, nunca
// datos que vengan del backend, así que usar innerHTML aquí es seguro.
function mensajeEstado(texto, esError = false) {
  return `<p class="estado-mensaje${esError ? " estado-mensaje--error" : ""}">${texto}</p>`;
}
