// Lógica de la página de catálogo: pide los datos a api.js y los dibuja en el DOM.
// No sabe nada de URLs ni de fetch — eso es responsabilidad de api.js.
import { obtenerProductos, obtenerCategorias } from "./api.js";
import { formatearPrecio } from "./formato.js";

let productosCache = [];

export async function inicializarCatalogo() {
  const contenedorCategorias = document.getElementById("categorias");
  const contenedorProductos = document.getElementById("productos");

  contenedorProductos.innerHTML = mensajeEstado("Cargando productos...");

  try {
    const [productos, categorias] = await Promise.all([
      obtenerProductos(),
      obtenerCategorias(),
    ]);

    productosCache = productos;
    renderizarCategorias(categorias, contenedorCategorias, contenedorProductos);
    renderizarProductos(productos, contenedorProductos);
  } catch (error) {
    console.error("Error cargando el catálogo:", error);
    contenedorProductos.innerHTML = mensajeEstado(
      "No se pudieron cargar los productos. Verifica que el backend esté corriendo en " +
        "http://localhost:8080.",
      true
    );
  }
}

function renderizarCategorias(categorias, contenedorCategorias, contenedorProductos) {
  contenedorCategorias.innerHTML = "";

  const crearChip = (texto, categoriaId) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.textContent = texto;
    chip.className = "chip-categoria";
    chip.addEventListener("click", (evento) => {
      contenedorCategorias
        .querySelectorAll(".chip-categoria")
        .forEach((c) => c.classList.remove("activa"));
      evento.currentTarget.classList.add("activa");

      const productosFiltrados =
        categoriaId === null
          ? productosCache
          : productosCache.filter((p) => p.categoria.id === categoriaId);

      renderizarProductos(productosFiltrados, contenedorProductos);
    });
    return chip;
  };

  const chipTodas = crearChip("Todas", null);
  chipTodas.classList.add("activa");
  contenedorCategorias.appendChild(chipTodas);

  categorias.forEach((categoria) => {
    contenedorCategorias.appendChild(crearChip(categoria.nombre, categoria.id));
  });
}

function renderizarProductos(productos, contenedor) {
  if (productos.length === 0) {
    contenedor.innerHTML = mensajeEstado("No hay productos en esta categoría todavía.");
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid-productos";
  productos.forEach((producto) => grid.appendChild(crearTarjetaProducto(producto)));

  contenedor.innerHTML = "";
  contenedor.appendChild(grid);
}

function crearTarjetaProducto(producto) {
  const enlace = document.createElement("a");
  enlace.className = "tarjeta-producto-enlace";
  enlace.href = `detalle-producto.html?id=${producto.id}`;

  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-producto";

  const imagen = document.createElement("div");
  imagen.className = "tarjeta-producto__imagen";
  imagen.textContent = "Sin imagen";

  const cuerpo = document.createElement("div");
  cuerpo.className = "tarjeta-producto__cuerpo";

  const categoria = document.createElement("p");
  categoria.className = "tarjeta-producto__categoria";
  categoria.textContent = producto.categoria.nombre;

  const nombre = document.createElement("h3");
  nombre.className = "tarjeta-producto__nombre";
  nombre.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.className = "tarjeta-producto__precio";
  precio.textContent = formatearPrecio(producto.precio);

  cuerpo.append(categoria, nombre, precio);

  if (producto.personalizable) {
    const insignia = document.createElement("span");
    insignia.className = "insignia-personalizable";
    insignia.textContent = "Personalizable";
    cuerpo.appendChild(insignia);
  }

  tarjeta.append(imagen, cuerpo);
  enlace.appendChild(tarjeta);
  return enlace;
}

// mensajeEstado solo recibe textos fijos definidos en este archivo (nunca datos
// que vengan del backend), así que usar innerHTML aquí es seguro.
function mensajeEstado(texto, esError = false) {
  return `<p class="estado-mensaje${esError ? " estado-mensaje--error" : ""}">${texto}</p>`;
}
