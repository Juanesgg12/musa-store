// Arma el mensaje de WhatsApp para confirmar un pedido (MUSA-003, UC-012).
// No hay integración con la API de WhatsApp Business: solo generamos el link
// "wa.me" con el texto ya armado, y el cliente lo envía él mismo manualmente.
import { WHATSAPP_NUMERO } from "./config.js";
import { formatearPrecio } from "./formato.js";

const NOMBRES_METODO_ENTREGA = {
  DOMICILIO_LOCAL: "Domicilio local",
  TRANSPORTADORA: "Transportadora",
};

const ETIQUETAS_PERSONALIZACION = {
  ocasion: "Ocasión",
  nombre: "Nombre",
  mensaje: "Mensaje",
  instrucciones: "Instrucciones",
};

export function construirEnlaceWhatsApp(pedido, itemsCarrito, datosCliente, datosEntrega) {
  const mensaje = construirMensaje(pedido, itemsCarrito, datosCliente, datosEntrega);
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

function construirMensaje(pedido, itemsCarrito, datosCliente, datosEntrega) {
  const lineas = [];

  lineas.push(`Hola Musa! Quiero confirmar mi pedido *${pedido.codigo}*`);
  lineas.push("");
  lineas.push("*Productos:*");

  itemsCarrito.forEach((item) => {
    lineas.push(`- ${item.cantidad} x ${item.nombre} (${formatearPrecio(item.precioUnitario)} c/u)`);
    const resumenPersonalizacion = describirPersonalizacion(item.personalizacion);
    if (resumenPersonalizacion) {
      lineas.push(`  Personalización: ${resumenPersonalizacion}`);
    }
  });

  lineas.push("");
  lineas.push(`*Total: ${formatearPrecio(pedido.total)}*`);
  lineas.push("");
  lineas.push("*Datos de contacto:*");
  lineas.push(`Nombre: ${datosCliente.nombre}`);
  if (datosCliente.telefono) {
    lineas.push(`Teléfono: ${datosCliente.telefono}`);
  }
  lineas.push(`Entrega: ${datosEntrega.direccion}, ${datosEntrega.municipio}`);
  lineas.push(`Método: ${NOMBRES_METODO_ENTREGA[datosEntrega.metodo] || datosEntrega.metodo}`);

  return lineas.join("\n");
}

function describirPersonalizacion(personalizacion) {
  if (!personalizacion) return null;

  return Object.entries(personalizacion)
    .filter(([, valor]) => valor)
    .map(([clave, valor]) => `${ETIQUETAS_PERSONALIZACION[clave] || clave}: ${valor}`)
    .join(", ");
}
