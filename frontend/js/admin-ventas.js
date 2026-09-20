// Lógica del dashboard de ventas: pide las métricas a GET /api/admin/ventas
// (con un rango de fechas opcional) y las pinta.
import { obtenerVentas } from "./api.js";
import { cerrarSesion } from "./sesion.js";
import { formatearPrecio } from "./formato.js";

const ESTADOS = [
  "PENDIENTE_CONFIRMACION",
  "CONFIRMADO",
  "EN_PREPARACION",
  "LISTO",
  "ENVIADO",
  "ENTREGADO",
  "CANCELADO",
];

export async function inicializarAdminVentas() {
  document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "../index.html";
  });

  document.getElementById("btn-filtrar").addEventListener("click", () => {
    const desde = document.getElementById("fecha-desde").value || null;
    const hasta = document.getElementById("fecha-hasta").value || null;
    cargarVentas(desde, hasta);
  });

  document.getElementById("btn-limpiar").addEventListener("click", () => {
    document.getElementById("fecha-desde").value = "";
    document.getElementById("fecha-hasta").value = "";
    cargarVentas(null, null);
  });

  await cargarVentas(null, null);
}

async function cargarVentas(fechaDesde, fechaHasta) {
  const mensaje = document.getElementById("mensaje-ventas");
  mensaje.innerHTML = "";

  try {
    const ventas = await obtenerVentas(fechaDesde, fechaHasta);
    pintarResumen(ventas);
    pintarEstados(ventas.pedidosPorEstado);
    pintarProductosMasVendidos(ventas.productosMasVendidos);
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function pintarResumen(ventas) {
  document.getElementById("stat-total-pedidos").textContent = ventas.totalPedidos;
  document.getElementById("stat-total-vendido").textContent = formatearPrecio(ventas.totalVendido);
}

function pintarEstados(pedidosPorEstado) {
  const cuerpo = document.getElementById("tabla-estados-cuerpo");
  cuerpo.innerHTML = "";

  ESTADOS.forEach((estado) => {
    const fila = document.createElement("tr");
    const tdEstado = document.createElement("td");
    tdEstado.textContent = estado;
    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = pedidosPorEstado[estado] || 0;
    fila.append(tdEstado, tdCantidad);
    cuerpo.appendChild(fila);
  });
}

function pintarProductosMasVendidos(productos) {
  const cuerpo = document.getElementById("tabla-productos-vendidos-cuerpo");
  cuerpo.innerHTML = "";

  if (productos.length === 0) {
    const fila = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 2;
    td.className = "texto-suave";
    td.textContent = "Todavía no hay ventas en este periodo.";
    fila.appendChild(td);
    cuerpo.appendChild(fila);
    return;
  }

  productos.forEach((producto) => {
    const fila = document.createElement("tr");
    const tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;
    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = producto.cantidadVendida;
    fila.append(tdNombre, tdCantidad);
    cuerpo.appendChild(fila);
  });
}

function mostrarMensaje(contenedor, texto, tipo) {
  contenedor.innerHTML = "";
  const parrafo = document.createElement("p");
  parrafo.className = `mensaje-formulario mensaje-formulario--${tipo}`;
  parrafo.textContent = texto;
  contenedor.appendChild(parrafo);
}
