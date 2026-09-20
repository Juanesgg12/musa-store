// Lógica del panel de administración de pedidos: listar (resumen), ver el
// detalle completo de uno (cliente, entrega, items) y actualizar su estado.
import { obtenerPedidosAdmin, obtenerPedidoPorId, actualizarEstadoPedido } from "./api.js";
import { cerrarSesion } from "./sesion.js";
import { formatearPrecio } from "./formato.js";

const NOMBRES_METODO_ENTREGA = {
  DOMICILIO_LOCAL: "Domicilio local",
  TRANSPORTADORA: "Transportadora",
};

let pedidoSeleccionadoId = null;

export async function inicializarAdminPedidos() {
  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../index.html";
  });

  document.getElementById("btn-cerrar-detalle").addEventListener("click", ocultarDetalle);
  document.getElementById("btn-guardar-estado").addEventListener("click", manejarGuardarEstado);

  await cargarPedidos();
}

async function cargarPedidos() {
  const cuerpoTabla = document.getElementById("tabla-pedidos-cuerpo");
  const mensaje = document.getElementById("mensaje-pedidos");
  mensaje.innerHTML = "";

  try {
    const pedidos = await obtenerPedidosAdmin();
    cuerpoTabla.innerHTML = "";
    pedidos.forEach((pedido) => cuerpoTabla.appendChild(crearFilaPedido(pedido)));
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function crearFilaPedido(pedido) {
  const fila = document.createElement("tr");

  const tdCodigo = document.createElement("td");
  tdCodigo.textContent = pedido.codigo;

  const tdEstado = document.createElement("td");
  tdEstado.appendChild(crearInsigniaEstado(pedido.estado));

  const tdTotal = document.createElement("td");
  tdTotal.textContent = formatearPrecio(pedido.total);

  const tdFecha = document.createElement("td");
  tdFecha.textContent = formatearFecha(pedido.fechaCreacion);

  const tdAcciones = document.createElement("td");
  const botonVer = document.createElement("button");
  botonVer.type = "button";
  botonVer.className = "boton-enlace";
  botonVer.textContent = "Ver detalle";
  botonVer.addEventListener("click", () => mostrarDetalle(pedido.id));
  tdAcciones.appendChild(botonVer);

  fila.append(tdCodigo, tdEstado, tdTotal, tdFecha, tdAcciones);
  return fila;
}

function crearInsigniaEstado(estado) {
  const insignia = document.createElement("span");
  let modificador = "";
  if (estado === "ENTREGADO") modificador = " insignia-estado--activo";
  if (estado === "CANCELADO") modificador = " insignia-estado--inactivo";
  insignia.className = `insignia-estado${modificador}`;
  insignia.textContent = estado;
  return insignia;
}

async function mostrarDetalle(id) {
  const mensaje = document.getElementById("mensaje-pedidos");
  try {
    const pedido = await obtenerPedidoPorId(id);
    pedidoSeleccionadoId = pedido.id;

    document.getElementById("detalle-codigo").textContent = pedido.codigo;
    document.getElementById("detalle-estado").value = pedido.estado;
    document.getElementById("mensaje-detalle").innerHTML = "";
    document.getElementById("detalle-cuerpo").innerHTML = "";
    document.getElementById("detalle-cuerpo").appendChild(construirCuerpoDetalle(pedido));

    document.getElementById("panel-detalle").classList.add("visible");
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function construirCuerpoDetalle(pedido) {
  const contenedor = document.createElement("div");

  const cliente = document.createElement("p");
  cliente.append(
    crearFuerte("Cliente: "),
    document.createTextNode(`${pedido.nombreCliente} — ${pedido.emailCliente}${pedido.telefonoCliente ? " — " + pedido.telefonoCliente : ""}`)
  );

  const entrega = document.createElement("p");
  entrega.append(
    crearFuerte("Entrega: "),
    document.createTextNode(`${pedido.direccionEntrega}, ${pedido.municipioEntrega} (${NOMBRES_METODO_ENTREGA[pedido.metodoEntrega] || pedido.metodoEntrega})`)
  );

  const totalP = document.createElement("p");
  totalP.append(
    crearFuerte("Subtotal / Envío / Total: "),
    document.createTextNode(`${formatearPrecio(pedido.subtotal)} / ${formatearPrecio(pedido.costoEnvio)} / ${formatearPrecio(pedido.total)}`)
  );

  const tituloItems = document.createElement("p");
  tituloItems.appendChild(crearFuerte("Productos:"));

  const listaItems = document.createElement("ul");
  pedido.items.forEach((item) => {
    const li = document.createElement("li");
    let texto = `${item.cantidad} x ${item.nombreProducto} — ${formatearPrecio(item.subtotal)}`;
    if (item.personalizacion) {
      const detalles = Object.entries(item.personalizacion)
        .filter(([, valor]) => valor)
        .map(([clave, valor]) => `${clave}: ${valor}`)
        .join(", ");
      if (detalles) texto += ` (${detalles})`;
    }
    li.textContent = texto;
    listaItems.appendChild(li);
  });

  contenedor.append(cliente, entrega, totalP, tituloItems, listaItems);
  return contenedor;
}

function crearFuerte(texto) {
  const strong = document.createElement("strong");
  strong.textContent = texto;
  return strong;
}

function ocultarDetalle() {
  document.getElementById("panel-detalle").classList.remove("visible");
  pedidoSeleccionadoId = null;
}

async function manejarGuardarEstado() {
  if (!pedidoSeleccionadoId) return;

  const boton = document.getElementById("btn-guardar-estado");
  const mensajeDetalle = document.getElementById("mensaje-detalle");
  const nuevoEstado = document.getElementById("detalle-estado").value;
  boton.disabled = true;

  try {
    await actualizarEstadoPedido(pedidoSeleccionadoId, nuevoEstado);
    ocultarDetalle();
    await cargarPedidos();
  } catch (error) {
    mostrarMensaje(mensajeDetalle, error.message, "error");
  } finally {
    boton.disabled = false;
  }
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mostrarMensaje(contenedor, texto, tipo) {
  contenedor.innerHTML = "";
  const parrafo = document.createElement("p");
  parrafo.className = `mensaje-formulario mensaje-formulario--${tipo}`;
  parrafo.textContent = texto;
  contenedor.appendChild(parrafo);
}
