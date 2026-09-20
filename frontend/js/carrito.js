// Maneja el carrito de compras, guardado en localStorage (no hay backend de
// carrito: el pedido solo existe una vez que el cliente confirma la compra).
// Cada línea del carrito tiene la MISMA forma que un item de POST /api/pedidos
// (productoId, cantidad, personalizacion), para que crear el pedido después
// sea simplemente mandar este arreglo tal cual. nombre/precioUnitario se
// guardan aparte, solo para poder mostrar el carrito sin volver a pedirle
// los productos al backend.

const CLAVE_CARRITO = "musa_carrito";

function leerCarrito() {
  const crudo = localStorage.getItem(CLAVE_CARRITO);
  return crudo ? JSON.parse(crudo) : [];
}

function guardarCarrito(items) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
}

export function obtenerCarrito() {
  return leerCarrito();
}

export function agregarAlCarrito({ productoId, nombre, precioUnitario, cantidad, personalizacion }) {
  const items = leerCarrito();
  items.push({ productoId, nombre, precioUnitario, cantidad, personalizacion: personalizacion || null });
  guardarCarrito(items);
}

export function quitarDelCarrito(indice) {
  const items = leerCarrito();
  items.splice(indice, 1);
  guardarCarrito(items);
}

export function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
}

export function contarItemsCarrito() {
  return leerCarrito().reduce((total, item) => total + item.cantidad, 0);
}
