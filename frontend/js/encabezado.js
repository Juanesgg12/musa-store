// Actualiza el bloque de navegación de la cuenta y el contador del carrito
// en el header. Lo llama cada página al cargar (y quien cambie el carrito).
import { haySesionActiva, obtenerUsuario, cerrarSesion } from "./sesion.js";
import { contarItemsCarrito } from "./carrito.js";

export function pintarEncabezado() {
  pintarCuenta();
  pintarContadorCarrito();
}

function pintarContadorCarrito() {
  const contador = document.getElementById("nav-carrito-contador");
  if (!contador) return;

  const total = contarItemsCarrito();
  contador.textContent = total > 0 ? `(${total})` : "";
}

function pintarCuenta() {
  const contenedor = document.getElementById("nav-cuenta");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (!haySesionActiva()) {
    const enlace = document.createElement("a");
    enlace.href = "cuenta.html";
    enlace.textContent = "Mi cuenta";
    contenedor.appendChild(enlace);
    return;
  }

  const usuario = obtenerUsuario();

  const saludo = document.createElement("span");
  saludo.className = "nav-saludo";
  saludo.textContent = `Hola, ${usuario.nombre}`;

  const botonSalir = document.createElement("button");
  botonSalir.type = "button";
  botonSalir.className = "boton-enlace";
  botonSalir.textContent = "Cerrar sesión";
  botonSalir.addEventListener("click", () => {
    cerrarSesion();
    pintarEncabezado();
  });

  const enlacePedidos = document.createElement("a");
  enlacePedidos.href = "mis-pedidos.html";
  enlacePedidos.className = "nav-saludo";
  enlacePedidos.textContent = "Mis pedidos";
  contenedor.append(enlacePedidos);

  if (usuario.rol === "ADMIN") {
    const enlaceAdmin = document.createElement("a");
    enlaceAdmin.href = "admin/productos.html";
    enlaceAdmin.className = "nav-saludo";
    enlaceAdmin.textContent = "Panel admin";
    contenedor.append(enlaceAdmin);
  }

  contenedor.append(saludo, botonSalir);
}
