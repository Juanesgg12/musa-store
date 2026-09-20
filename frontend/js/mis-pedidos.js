// Lógica de "Mis pedidos": lista los pedidos del cliente autenticado
// (GET /api/pedidos/mis-pedidos) y muestra el detalle completo de uno al
// expandirlo (GET /api/pedidos/{id}, solo se pide la primera vez que se abre).
import { obtenerMisPedidos, obtenerPedidoPorId } from "./api.js";
import { haySesionActiva } from "./sesion.js";
import { formatearPrecio } from "./formato.js";

const NOMBRES_METODO_ENTREGA = {
  DOMICILIO_LOCAL: "Domicilio local",
  TRANSPORTADORA: "Transportadora",
};

const detallesCache = new Map();

export async function inicializarMisPedidos() {
  const contenedor = document.getElementById("lista-mis-pedidos");

  if (!haySesionActiva()) {
    window.location.href = "cuenta.html";
    return;
  }

  contenedor.innerHTML = '<p class="estado-mensaje">Cargando tus pedidos...</p>';

  try {
    const pedidos = await obtenerMisPedidos();
    renderizarLista(pedidos, contenedor);
  } catch (error) {
    console.error("Error cargando mis pedidos:", error);
    contenedor.innerHTML = '<p class="estado-mensaje estado-mensaje--error">No se pudieron cargar tus pedidos.</p>';
  }
}

function renderizarLista(pedidos, contenedor) {
  if (pedidos.length === 0) {
    contenedor.innerHTML = '<p class="estado-mensaje">Todavía no has hecho ningún pedido. <a href="index.html">Ver catálogo</a></p>';
    return;
  }

  const lista = document.createElement("div");
  lista.className = "lista-pedidos";
  pedidos.forEach((pedido) => lista.appendChild(crearTarjetaPedido(pedido)));

  contenedor.innerHTML = "";
  contenedor.appendChild(lista);
}

function crearTarjetaPedido(pedido) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-pedido";

  const encabezado = document.createElement("div");
  encabezado.className = "tarjeta-pedido__encabezado";

  const info = document.createElement("div");
  info.className = "tarjeta-pedido__info";

  const codigo = document.createElement("span");
  codigo.className = "tarjeta-pedido__codigo";
  codigo.textContent = pedido.codigo;

  const fecha = document.createElement("span");
  fecha.className = "tarjeta-pedido__fecha";
  fecha.textContent = formatearFecha(pedido.fechaCreacion);

  info.append(codigo, crearInsigniaEstado(pedido.estado), fecha);

  const derecha = document.createElement("div");
  derecha.className = "tarjeta-pedido__info";

  const total = document.createElement("span");
  total.className = "tarjeta-pedido__total";
  total.textContent = formatearPrecio(pedido.total);

  const botonVer = document.createElement("button");
  botonVer.type = "button";
  botonVer.className = "boton-enlace";
  botonVer.textContent = "Ver detalle";

  const detalle = document.createElement("div");
  detalle.className = "tarjeta-pedido__detalle";

  botonVer.addEventListener("click", async () => {
    const abierto = detalle.classList.toggle("visible");
    botonVer.textContent = abierto ? "Ocultar detalle" : "Ver detalle";
    if (abierto && detalle.childElementCount === 0) {
      await cargarDetalle(pedido.id, detalle);
    }
  });

  derecha.append(total, botonVer);
  encabezado.append(info, derecha);

  tarjeta.append(encabezado, detalle);
  return tarjeta;
}

async function cargarDetalle(id, contenedorDetalle) {
  contenedorDetalle.innerHTML = '<p class="estado-mensaje">Cargando...</p>';

  try {
    let pedido = detallesCache.get(id);
    if (!pedido) {
      pedido = await obtenerPedidoPorId(id);
      detallesCache.set(id, pedido);
    }

    contenedorDetalle.innerHTML = "";
    contenedorDetalle.appendChild(construirCuerpoDetalle(pedido));
  } catch (error) {
    contenedorDetalle.innerHTML = '<p class="estado-mensaje estado-mensaje--error">No se pudo cargar el detalle.</p>';
  }
}

function construirCuerpoDetalle(pedido) {
  const contenedor = document.createElement("div");

  const entrega = document.createElement("p");
  entrega.append(
    crearFuerte("Entrega: "),
    document.createTextNode(
      `${pedido.direccionEntrega}, ${pedido.municipioEntrega} (${NOMBRES_METODO_ENTREGA[pedido.metodoEntrega] || pedido.metodoEntrega})`
    )
  );

  const tituloItems = document.createElement("p");
  tituloItems.appendChild(crearFuerte("Productos:"));

  const lista = document.createElement("ul");
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
    lista.appendChild(li);
  });

  contenedor.append(entrega, tituloItems, lista);
  return contenedor;
}

function crearInsigniaEstado(estado) {
  const insignia = document.createElement("span");
  let modificador = "";
  if (estado === "ENTREGADO") modificador = " insignia-pedido-estado--entregado";
  if (estado === "CANCELADO") modificador = " insignia-pedido-estado--cancelado";
  insignia.className = `insignia-pedido-estado${modificador}`;
  insignia.textContent = estado;
  return insignia;
}

function crearFuerte(texto) {
  const strong = document.createElement("strong");
  strong.textContent = texto;
  return strong;
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
