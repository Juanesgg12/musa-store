// Lógica de la página de cuenta: alterna entre las pestañas de login/registro,
// envía los formularios y guarda la sesión cuando el login funciona.
import { login, registrar } from "./api.js";
import { guardarSesion } from "./sesion.js";
import { pintarEncabezado } from "./encabezado.js";

export function inicializarAuth() {
  const tabs = document.querySelectorAll(".tab-auth");
  const formLogin = document.getElementById("form-login");
  const formRegistro = document.getElementById("form-registro");
  const contenedorMensaje = document.getElementById("mensaje-auth");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("activa"));
      tab.classList.add("activa");
      contenedorMensaje.innerHTML = "";

      const destino = tab.dataset.tab;
      formLogin.classList.toggle("visible", destino === "login");
      formRegistro.classList.toggle("visible", destino === "registro");
    });
  });

  formLogin.addEventListener("submit", (evento) => manejarLogin(evento, formLogin, contenedorMensaje));
  formRegistro.addEventListener("submit", (evento) => manejarRegistro(evento, formRegistro, tabs, formLogin, contenedorMensaje));
}

async function manejarLogin(evento, formLogin, contenedorMensaje) {
  evento.preventDefault();
  const boton = formLogin.querySelector("button[type=submit]");
  boton.disabled = true;

  try {
    const datos = new FormData(formLogin);
    const respuesta = await login(datos.get("email"), datos.get("password"));

    guardarSesion(respuesta.token, respuesta.usuario);
    pintarEncabezado();
    mostrarMensaje(contenedorMensaje, `¡Hola, ${respuesta.usuario.nombre}! Redirigiendo...`, "exito");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  } catch (error) {
    mostrarMensaje(contenedorMensaje, error.message, "error");
    boton.disabled = false;
  }
}

async function manejarRegistro(evento, formRegistro, tabs, formLogin, contenedorMensaje) {
  evento.preventDefault();
  const boton = formRegistro.querySelector("button[type=submit]");
  boton.disabled = true;

  try {
    const datos = new FormData(formRegistro);
    await registrar({
      nombre: datos.get("nombre"),
      apellido: datos.get("apellido"),
      email: datos.get("email"),
      telefono: datos.get("telefono") || null,
      password: datos.get("password"),
    });

    mostrarMensaje(contenedorMensaje, "Cuenta creada. Ahora inicia sesión.", "exito");
    formRegistro.reset();

    // Vuelve a la pestaña de login para que el usuario entre con la cuenta recién creada.
    tabs.forEach((t) => t.classList.remove("activa"));
    document.querySelector('.tab-auth[data-tab="login"]').classList.add("activa");
    formRegistro.classList.remove("visible");
    formLogin.classList.add("visible");
  } catch (error) {
    mostrarMensaje(contenedorMensaje, error.message, "error");
  } finally {
    boton.disabled = false;
  }
}

// texto siempre va por textContent (nunca innerHTML): puede contener el mensaje
// de error tal cual lo mandó el backend, y no debe interpretarse como HTML.
function mostrarMensaje(contenedor, texto, tipo) {
  const parrafo = document.createElement("p");
  parrafo.className = `mensaje-formulario mensaje-formulario--${tipo}`;
  parrafo.textContent = texto;

  contenedor.innerHTML = "";
  contenedor.appendChild(parrafo);
}
