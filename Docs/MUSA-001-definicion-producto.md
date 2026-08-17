# MUSA — Definición del Producto

**Documento:** MUSA-001  
**Estado:** Completada  
**Versión:** 1.0  
**Fecha:** 2026-08-16

---

## 1. Visión del producto

Musa es un pequeño emprendimiento de sublimación creado por una pareja. La marca comienza como una tienda virtual de productos personalizados, pero la visión a largo plazo es convertir Musa en una marca con identidad propia, diseños únicos y colecciones originales.

La primera versión de la plataforma tendrá como objetivo:

**Mostrar la marca → mostrar productos → permitir personalización → generar carrito → enviar pedido por WhatsApp.**

La tienda virtual será el primer paso para que Musa llegue a más personas y posteriormente evolucione hacia una marca de productos y diseños propios.

---

## 2. Identidad de marca

Musa debe transmitir:

- Creatividad
- Arte
- Personalización
- Urbano
- Juventud
- Calidad
- Premium
- Minimalismo

La identidad visual de Musa ya existe y será proporcionada por la diseñadora encargada del branding. El desarrollo de la plataforma deberá respetar esta identidad.

---

## 3. Roles del equipo

### Desarrollo

El desarrollo estará principalmente a cargo del usuario.

### Diseño y branding

La pareja del usuario es diseñadora y estará a cargo del diseño y branding de Musa.

### Mentoría y desarrollo asistido

El proyecto utilizará:

- ChatGPT: mentoría, arquitectura, planificación, revisión y aprendizaje.
- Claude: apoyo en implementación, refactorización y análisis de código.

Roo Code no será utilizado.

---

## 4. Catálogo inicial

Musa podrá vender productos como:

- Vasos de diferentes tamaños
- Mugs
- Camisetas
- Gorras
- Cuadros
- Rompecabezas
- Termos
- Llaveros
- Manillas
- Mouse pads
- Ruanas
- Otros productos que puedan ser sublimados

Los productos podrán tener opciones de personalización.

El sistema deberá utilizar un modelo de producto flexible para permitir agregar nuevos productos sin modificar la arquitectura principal.

---

## 5. Público objetivo

Los principales clientes de Musa serán:

- Personas que buscan regalos.
- Parejas.
- Personas que buscan productos para fechas especiales.
- Empresas.
- Emprendedores.
- Organizadores de eventos.
- Personas que quieren productos personalizados.

Algunas posibles ocasiones o campañas futuras:

- Cumpleaños
- San Valentín
- Navidad
- Grados
- Regalos
- Parejas
- Empresas
- Eventos

---

## 6. Flujo principal de compra

El flujo inicial será:

1. El cliente entra a Musa.
2. Navega por el catálogo.
3. Busca o selecciona una categoría.
4. Selecciona un producto.
5. Selecciona la cantidad.
6. Decide si quiere personalizarlo o utilizar un diseño disponible de Musa.
7. Agrega el producto al carrito.
8. Revisa el carrito.
9. Confirma el pedido.
10. El sistema dirige al cliente a WhatsApp.
11. Musa confirma manualmente el pedido.
12. Se realiza el pago.

### Flujo resumido

```text
Inicio
  ↓
Catálogo
  ↓
Producto
  ↓
Diseño existente / Personalización
  ↓
Cantidad
  ↓
Carrito
  ↓
Confirmar pedido
  ↓
WhatsApp
  ↓
Confirmación
  ↓
Pago
```

---

## 7. Usuarios

Musa tendrá tres tipos principales de usuarios.

### 7.1 Visitante / Guest

No necesita crear una cuenta.

Podrá:

- Navegar por la página.
- Buscar productos.
- Ver categorías.
- Ver detalles de productos.
- Personalizar productos.
- Agregar productos al carrito.
- Crear un pedido.
- Enviar el pedido por WhatsApp.

El objetivo es permitir una compra rápida sin obligar al usuario a registrarse.

### 7.2 Cliente registrado

Podrá:

- Crear una cuenta.
- Iniciar sesión.
- Guardar sus datos.
- Realizar compras.
- Consultar pedidos.
- Consultar historial de compras.
- Repetir compras posteriormente.

### 7.3 Administrador

Podrá administrar:

- Productos.
- Categorías.
- Pedidos.
- Usuarios.
- Información básica de ventas.

---

## 8. Administración

### Productos

```text
Productos
├── Crear
├── Editar
├── Eliminar
└── Ver
```

### Categorías

```text
Categorías
├── Crear
├── Editar
├── Eliminar
└── Ver
```

### Pedidos

```text
Pedidos
├── Ver
├── Actualizar estado
└── Historial
```

### Usuarios

```text
Usuarios
├── Ver
└── Administrar
```

### Ventas

Se incluirá posteriormente un dashboard básico para consultar información de ventas.

---

## 9. Personalización de productos

La personalización será una de las características importantes de Musa.

Un producto podrá permitir opciones como:

- Seleccionar si desea personalización.
- Seleccionar una ocasión.
- Escribir un nombre.
- Escribir un mensaje.
- Subir una imagen.
- Seleccionar un diseño existente de Musa.

Ejemplo:

```text
MUG PERSONALIZADO

Cantidad:
[ - ] 2 [ + ]

¿Quieres personalizarlo?
○ No
● Sí

Tipo de ocasión:
[ Cumpleaños ]

Nombre:
[ Juan ]

Mensaje:
[ Feliz cumpleaños ]

Imagen:
[ Subir imagen ]

Diseño:
[ Seleccionar diseño Musa ]

[ AGREGAR AL CARRITO ]
```

### Alcance inicial

La primera versión no tendrá un editor gráfico avanzado.

No se implementará inicialmente:

- Mover elementos libremente.
- Rotar elementos.
- Escalar elementos.
- Diseñar completamente desde el navegador.

Estas funcionalidades podrán evaluarse en una versión futura.

---

## 10. Página de inicio

La página de inicio deberá incluir como mínimo:

### Navegación

- Logo.
- Inicio.
- Productos.
- Categorías.
- Buscador.
- Acceso a cuenta.
- Carrito.

### Contenido

- Identidad de Musa.
- Logo.
- Hero/banner principal.
- Imagen de producto.
- Productos destacados.
- Categorías.
- Sección "¿Por qué Musa?"
- Sección de personalización.
- Redes sociales.
- Footer.

La página deberá reflejar la identidad visual creada por la diseñadora.

---

## 11. Entregas

La estrategia inicial todavía está pendiente de definición completa.

Idea actual:

### La Ceja

- Domicilios propios.

### Oriente Antioqueño / Antioquia

- Envío mediante transportadora.

Quedan pendientes de definir:

- Cobertura exacta.
- Costo de envío.
- Tiempo estimado.
- Transportadoras.
- Quién asume el costo del envío.
- Posibles condiciones de envío gratis.

---

## 12. Pagos

### MVP

No se implementará una pasarela de pago.

Flujo:

```text
Pedido
  ↓
WhatsApp
  ↓
Confirmación
  ↓
Pago
```

### Futuro

Se podrá implementar:

```text
Carrito
  ↓
Checkout
  ↓
Pasarela de pago
  ↓
Pago confirmado
  ↓
Pedido confirmado automáticamente
```

---

## 13. Alcance del MVP

### Incluido

#### Cliente

- Home.
- Catálogo.
- Categorías.
- Buscador.
- Detalle de producto.
- Selección de cantidad.
- Personalización.
- Carrito.
- Pedido.
- WhatsApp.
- Compra sin registro.
- Registro.
- Login.
- Historial básico para usuarios registrados.

#### Administrador

- Login.
- Gestión de productos.
- Gestión de categorías.
- Gestión de pedidos.
- Gestión de usuarios.
- Estados de pedidos.
- Información básica de ventas.

#### Técnico

- Frontend.
- Backend REST API.
- MySQL.
- Autenticación.
- Diseño responsive.
- Git/GitHub.

---

## 14. Fuera del MVP

Las siguientes funcionalidades quedan para futuras versiones:

- Pasarela de pagos.
- Sistema avanzado de inventario.
- Integración automática con transportadoras.
- Editor gráfico avanzado.
- Cupones.
- Reviews.
- Sistema de puntos.
- IA para diseño de productos.
- Aplicación móvil.
- Microservicios.
- Docker.
- Otras funcionalidades avanzadas que no sean necesarias para validar el producto.

---

## 15. Visión a futuro

Musa no debe quedar limitada a ser una tienda de sublimación.

La visión a largo plazo es:

```text
                 MUSA
                   │
        ┌──────────┴──────────┐
        │                     │
      TIENDA                 MARCA
        │                     │
    Productos              Diseños propios
    Personalizados         Colecciones
    Catálogo               Identidad
    Pedidos                Musa Originals
        │                     │
        └──────────┬──────────┘
                   │
              MUSA CREATIVA
```

La arquitectura deberá permitir que la tienda evolucione posteriormente hacia una marca con productos y diseños propios.

---

## 16. Decisiones actuales

| Decisión | Estado |
|---|---|
| Musa comenzará como tienda virtual | ✅ |
| Visión futura como marca | ✅ |
| Productos personalizados | ✅ |
| Compra sin registro | ✅ |
| Usuarios registrados | ✅ |
| Administrador | ✅ |
| Pedidos por WhatsApp | ✅ |
| Pasarela de pago | 🔵 Futuro |
| Domicilios en La Ceja | 🟡 Por definir |
| Envíos por transportadora | 🟡 Por definir |
| Editor gráfico avanzado | 🔵 Futuro |
| Roo Code | ❌ No utilizar |
| ChatGPT | ✅ |
| Claude | ✅ |

---

## 17. Estado del proyecto

**MUSA-001 — Definición del producto: COMPLETADA ✅**

### Próxima tarea

**MUSA-002 — Requisitos funcionales y no funcionales**

En esta tarea se convertirán las decisiones de este documento en requisitos concretos del sistema.

Ejemplo:

```text
RF-001
El sistema deberá permitir visualizar el catálogo de productos.

RF-002
El sistema deberá permitir buscar productos.

RF-003
El sistema deberá permitir agregar productos al carrito.

RNF-001
La aplicación deberá ser responsive.
```

No se deberá comenzar el desarrollo principal hasta completar las etapas de análisis necesarias.
