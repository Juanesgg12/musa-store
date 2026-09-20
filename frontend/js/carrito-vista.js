// Lógica de la página de carrito: lista los items, permite quitarlos, y
// envía el pedido a POST /api/pedidos cuando el cliente confirma.
import { obtenerCarrito, quitarDelCarrito, vaciarCarrito } from "./carrito.js";
import { crearPedido } from "./api.js";
import { obtenerUsuario, haySesionActiva } from "./sesion.js";
import { pintarEncabezado } from "./encabezado.js";
import { formatearPrecio } from "./formato.js";
import { construirEnlaceWhatsApp } from "./whatsapp.js";

export function inicializarCarrito() {
  renderizarCarrito();
  prellenarFormularioSiHaySesion();
  document.getElementById("form-pedido").addEventListener("submit", manejarConfirmarPedido);
}

function renderizarCarrito() {
  const items = obtenerCarrito();
  const contenedorItems = document.getElementById("lista-carrito");
  const contenedorTotales = document.getElementById("totales-carrito");
  const seccionCheckout = document.getElementById("seccion-checkout");

  contenedorItems.innerHTML = "";
  contenedorTotales.innerHTML = "";

  if (items.length === 0) {
    contenedorItems.innerHTML =
      '<p class="estado-mensaje">Tu carrito está vacío. <a href="index.html">Ver catálogo</a></p>';
    seccionCheckout.hidden = true;
    return;
  }

  seccionCheckout.hidden = false;

  const lista = document.createElement("div");
  lista.className = "lista-items-carrito";

  let total = 0;
  items.forEach((item, indice) => {
    total += item.precioUnitario * item.cantidad;
    lista.appendChild(crearFilaItem(item, indice));
  });

  contenedorItems.appendChild(lista);

  const totalTexto = document.createElement("p");
  totalTexto.className = "carrito-total";
  totalTexto.textContent = `Total: ${formatearPrecio(total)}`;
  contenedorTotales.appendChild(totalTexto);
}

function crearFilaItem(item, indice) {
  const fila = document.createElement("div");
  fila.className = "fila-carrito";

  const info = document.createElement("div");

  const nombre = document.createElement("p");
  nombre.className = "fila-carrito__nombre";
  nombre.textContent = item.nombre;

  const detalle = document.createElement("p");
  detalle.className = "fila-carrito__detalle";
  detalle.textContent = `${item.cantidad} x ${formatearPrecio(item.precioUnitario)}`;

  info.append(nombre, detalle);

  if (item.personalizacion) {
    const personal = document.createElement("p");
    personal.className = "fila-carrito__personalizacion";
    personal.textContent = Object.entries(item.personalizacion)
      .filter(([, valor]) => valor)
      .map(([clave, valor]) => `${clave}: ${valor}`)
      .join(" · ");
    info.appendChild(personal);
  }

  const subtotal = document.createElement("p");
  subtotal.className = "fila-carrito__subtotal";
  subtotal.textContent = formatearPrecio(item.precioUnitario * item.cantidad);

  const botonQuitar = document.createElement("button");
  botonQuitar.type = "button";
  botonQuitar.className = "boton-enlace";
  botonQuitar.textContent = "Quitar";
  botonQuitar.addEventListener("click", () => {
    quitarDelCarrito(indice);
    renderizarCarrito();
    pintarEncabezado();
  });

  fila.append(info, subtotal, botonQuitar);
  return fila;
}

function prellenarFormularioSiHaySesion() {
  if (!haySesionActiva()) return;
  const usuario = obtenerUsuario();
  document.getElementById("cliente-nombre").value = `${usuario.nombre} ${usuario.apellido}`.trim();
  document.getElementById("cliente-email").value = usuario.email;
}

async function manejarConfirmarPedido(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const boton = formulario.querySelector('button[type="submit"]');
  const contenedorMensaje = document.getElementById("mensaje-pedido");
  boton.disabled = true;

  try {
    const datos = new FormData(formulario);
    const itemsCarrito = obtenerCarrito(); // guardamos la versión completa (con nombre/precio) para el mensaje de WhatsApp, antes de vaciar el carrito
    const items = itemsCarrito.map((item) => ({
      productoId: item.productoId,
      cantidad: item.cantidad,
      personalizacion: item.personalizacion,
    }));

    const datosCliente = {
      nombre: datos.get("clienteNombre"),
      email: datos.get("clienteEmail"),
      telefono: datos.get("clienteTelefono") || null,
    };
    const datosEntrega = {
      municipio: datos.get("municipio"),
      direccion: datos.get("direccion"),
      metodo: datos.get("metodo"),
    };

    const pedido = await crearPedido({ cliente: datosCliente, entrega: datosEntrega, items });

    vaciarCarrito();
    pintarEncabezado();
    mostrarConfirmacionPedido(pedido, itemsCarrito, datosCliente, datosEntrega, contenedorMensaje);
    formulario.hidden = true;
    renderizarCarrito();
  } catch (error) {
    mostrarMensaje(error.message, "error", contenedorMensaje);
    boton.disabled = false;
  }
}

function mostrarConfirmacionPedido(pedido, itemsCarrito, datosCliente, datosEntrega, contenedor) {
  contenedor.innerHTML = "";
  const caja = document.createElement("div");
  caja.className = "mensaje-formulario mensaje-formulario--exito";

  const titulo = document.createElement("p");
  titulo.textContent = `¡Pedido creado! Código: ${pedido.codigo}`;

  const detalle = document.createElement("p");
  detalle.textContent = `Total: ${formatearPrecio(pedido.total)} — Estado: ${pedido.estado}`;

  const enlaceWhatsApp = document.createElement("a");
  enlaceWhatsApp.href = construirEnlaceWhatsApp(pedido, itemsCarrito, datosCliente, datosEntrega);
  enlaceWhatsApp.target = "_blank";
  enlaceWhatsApp.rel = "noopener";
  enlaceWhatsApp.className = "boton-primario boton-whatsapp";
  enlaceWhatsApp.textContent = "Continuar a WhatsApp";

  caja.append(titulo, detalle, enlaceWhatsApp);
  contenedor.appendChild(caja);
}

function mostrarMensaje(texto, tipo, contenedor) {
  contenedor.innerHTML = "";
  const parrafo = document.createElement("p");
  parrafo.className = `mensaje-formulario mensaje-formulario--${tipo}`;
  parrafo.textContent = texto;
  contenedor.appendChild(parrafo);
}
