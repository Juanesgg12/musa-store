# MUSA — Requisitos Funcionales y No Funcionales

**Documento:** MUSA-002  
**Estado:** Completada  
**Versión:** 1.0  
**Fecha:** 2026-08-16  
**Relacionado con:** MUSA-001 — Definición del Producto

---

# 1. Objetivo

Este documento convierte la visión definida en MUSA-001 en requisitos concretos que servirán como referencia para el diseño, desarrollo y pruebas de Musa.

Los requisitos se dividen en:

- Requisitos funcionales (RF): qué debe hacer el sistema.
- Requisitos no funcionales (RNF): cómo debe comportarse el sistema y qué condiciones de calidad debe cumplir.

El documento se centra en el MVP de Musa.

---

# 2. Alcance del MVP

El MVP permitirá:

- Visualizar la marca Musa.
- Explorar productos y categorías.
- Buscar productos.
- Ver detalles de productos.
- Seleccionar cantidades.
- Personalizar productos.
- Seleccionar diseños disponibles.
- Agregar productos al carrito.
- Comprar sin crear una cuenta.
- Crear una cuenta.
- Iniciar sesión.
- Consultar pedidos como cliente registrado.
- Enviar un pedido a WhatsApp.
- Administrar productos, categorías, pedidos y usuarios.
- Consultar información básica de ventas.

No se incluye inicialmente una pasarela de pagos.

---

# 3. Actores del sistema

## 3.1 Visitante / Guest

Persona que utiliza Musa sin iniciar sesión.

Puede:

- Navegar.
- Buscar.
- Ver productos.
- Ver categorías.
- Personalizar productos.
- Agregar productos al carrito.
- Crear un pedido.
- Enviar el pedido por WhatsApp.

## 3.2 Cliente registrado

Usuario que tiene una cuenta.

Puede:

- Iniciar sesión.
- Gestionar sus datos básicos.
- Comprar.
- Consultar sus pedidos.
- Consultar su historial.

## 3.3 Administrador

Usuario con permisos administrativos.

Puede:

- Gestionar productos.
- Gestionar categorías.
- Gestionar pedidos.
- Gestionar usuarios.
- Consultar información básica de ventas.

---

# 4. Requisitos funcionales

## 4.1 Página de inicio

### RF-001 — Mostrar página de inicio

El sistema deberá mostrar una página de inicio que represente la identidad visual de Musa.

### RF-002 — Mostrar navegación

El sistema deberá proporcionar una navegación hacia las principales secciones de la tienda.

La navegación deberá permitir acceder, como mínimo, a:

- Inicio.
- Productos.
- Categorías.
- Buscador.
- Cuenta.
- Carrito.

### RF-003 — Mostrar hero principal

La página de inicio deberá mostrar una sección principal con elementos visuales de Musa y una llamada a la acción.

### RF-004 — Mostrar productos destacados

La página de inicio deberá poder mostrar productos destacados.

### RF-005 — Mostrar categorías

La página de inicio deberá poder mostrar categorías de productos.

### RF-006 — Mostrar sección de personalización

La página de inicio deberá explicar o promocionar la posibilidad de personalizar productos.

### RF-007 — Mostrar redes sociales

La página deberá incluir accesos a las redes sociales oficiales de Musa cuando estén definidas.

### RF-008 — Mostrar footer

La página deberá mostrar un footer con información relevante de Musa.

---

# 5. Catálogo

### RF-009 — Visualizar catálogo

El sistema deberá permitir visualizar los productos disponibles.

### RF-010 — Visualizar categorías

El sistema deberá permitir visualizar las categorías de productos.

### RF-011 — Filtrar por categoría

El usuario deberá poder consultar productos pertenecientes a una categoría determinada.

### RF-012 — Buscar productos

El sistema deberá permitir buscar productos por texto.

### RF-013 — Ver detalle de producto

El usuario deberá poder abrir una página de detalle de un producto.

El detalle deberá mostrar, como mínimo:

- Nombre.
- Imágenes.
- Descripción.
- Precio.
- Categoría.
- Disponibilidad.
- Opciones de personalización cuando correspondan.

---

# 6. Productos

### RF-014 — Seleccionar cantidad

El usuario deberá poder seleccionar la cantidad que desea comprar.

### RF-015 — Validar disponibilidad

El sistema deberá impedir que el usuario solicite una cantidad superior a la disponibilidad registrada cuando el producto tenga control de stock.

### RF-016 — Mostrar estado del producto

El sistema deberá poder diferenciar productos disponibles y no disponibles.

### RF-017 — Productos personalizables

El sistema deberá poder identificar qué productos permiten personalización.

### RF-018 — Diseños de Musa

El sistema deberá permitir asociar diseños disponibles de Musa a productos cuando corresponda.

---

# 7. Personalización

### RF-019 — Activar personalización

El usuario deberá poder indicar si desea personalizar un producto cuando este lo permita.

### RF-020 — Seleccionar ocasión

El sistema deberá permitir seleccionar una ocasión o motivo de personalización cuando corresponda.

Ejemplos:

- Cumpleaños.
- San Valentín.
- Navidad.
- Regalo.
- Pareja.
- Evento.

### RF-021 — Introducir nombre

El usuario deberá poder introducir un nombre como parte de la personalización cuando corresponda.

### RF-022 — Introducir mensaje

El usuario deberá poder introducir un mensaje personalizado.

### RF-023 — Subir imagen

El sistema deberá permitir que el usuario adjunte una imagen para una personalización cuando el producto lo permita.

### RF-024 — Seleccionar diseño existente

El usuario deberá poder seleccionar un diseño previamente disponible en Musa cuando el producto lo permita.

### RF-025 — Guardar personalización

La información de personalización deberá quedar asociada al producto dentro del carrito y del pedido.

### RF-026 — Validar archivos

El sistema deberá validar los archivos de imagen aceptados según las reglas que se definan durante el desarrollo.

El tamaño máximo, formatos permitidos y otras restricciones serán definidos técnicamente antes de implementar esta funcionalidad.

---

# 8. Carrito

### RF-027 — Agregar producto

El usuario deberá poder agregar un producto al carrito.

### RF-028 — Agregar personalización

Cuando exista una personalización, esta deberá viajar asociada al producto agregado.

### RF-029 — Modificar cantidad

El usuario deberá poder modificar la cantidad de un producto en el carrito.

### RF-030 — Eliminar producto

El usuario deberá poder eliminar un producto del carrito.

### RF-031 — Mostrar resumen

El carrito deberá mostrar como mínimo:

- Productos.
- Cantidades.
- Precio unitario.
- Subtotal por producto.
- Total del carrito.

### RF-032 — Carrito para visitantes

Un visitante deberá poder utilizar el carrito sin crear una cuenta.

### RF-033 — Persistencia del carrito

El carrito de un visitante deberá mantenerse mientras continúe utilizando el navegador, de acuerdo con la estrategia técnica definida para el frontend.

---

# 9. Pedidos

### RF-034 — Crear pedido

El sistema deberá permitir convertir el carrito en una solicitud de pedido.

### RF-035 — Datos del pedido

El pedido deberá contener la información necesaria para identificar:

- Productos.
- Cantidades.
- Personalizaciones.
- Total.
- Datos del cliente.
- Fecha.
- Estado.

### RF-036 — Pedido sin registro

Un visitante deberá poder generar un pedido sin crear una cuenta.

### RF-037 — Pedido de usuario registrado

Un cliente registrado deberá poder generar pedidos asociados a su cuenta.

### RF-038 — Generar mensaje para WhatsApp

El sistema deberá preparar un mensaje con la información relevante del pedido para enviarlo a Musa mediante WhatsApp.

### RF-039 — Estado inicial

Un pedido recién creado deberá tener un estado inicial definido.

El conjunto final de estados será establecido durante el diseño del modelo de pedidos.

### RF-040 — Historial de pedidos

Los clientes registrados deberán poder consultar sus pedidos anteriores.

---

# 10. Usuarios

### RF-041 — Registro

El sistema deberá permitir crear una cuenta de cliente.

### RF-042 — Inicio de sesión

El sistema deberá permitir iniciar sesión.

### RF-043 — Cierre de sesión

El sistema deberá permitir cerrar sesión.

### RF-044 — Datos del cliente

El cliente deberá poder consultar y gestionar sus datos básicos.

### RF-045 — Protección de datos del usuario

Un cliente solamente deberá poder consultar la información de su propia cuenta y sus propios pedidos.

---

# 11. Administración de productos

### RF-046 — Crear producto

El administrador deberá poder crear productos.

### RF-047 — Editar producto

El administrador deberá poder editar productos existentes.

### RF-048 — Eliminar producto

El administrador deberá poder eliminar o desactivar productos según la estrategia que se defina.

### RF-049 — Consultar productos

El administrador deberá poder consultar los productos registrados.

### RF-050 — Gestionar imágenes

El administrador deberá poder asociar imágenes a los productos.

### RF-051 — Gestionar personalización

El administrador deberá poder definir si un producto admite personalización.

---

# 12. Administración de categorías

### RF-052 — Crear categoría

El administrador deberá poder crear categorías.

### RF-053 — Editar categoría

El administrador deberá poder editar categorías.

### RF-054 — Eliminar categoría

El administrador deberá poder eliminar o desactivar categorías según las reglas que se definan.

### RF-055 — Consultar categorías

El administrador deberá poder consultar las categorías registradas.

---

# 13. Administración de pedidos

### RF-056 — Consultar pedidos

El administrador deberá poder consultar los pedidos recibidos.

### RF-057 — Consultar detalle del pedido

El administrador deberá poder consultar el detalle de cada pedido.

### RF-058 — Actualizar estado

El administrador deberá poder actualizar el estado de un pedido.

### RF-059 — Historial de pedidos

El sistema deberá conservar el historial de pedidos.

### RF-060 — Filtrar pedidos

El administrador deberá poder consultar pedidos utilizando criterios que se definan posteriormente, como estado o fecha.

---

# 14. Administración de usuarios

### RF-061 — Consultar usuarios

El administrador deberá poder consultar los usuarios registrados.

### RF-062 — Gestionar usuarios

El administrador deberá poder realizar acciones administrativas sobre usuarios según los permisos definidos.

### RF-063 — Roles

El sistema deberá diferenciar como mínimo los roles:

- CLIENTE.
- ADMIN.

El visitante/guest no tendrá una cuenta ni un rol persistente.

---

# 15. Ventas

### RF-064 — Consultar información básica de ventas

El administrador deberá poder consultar información básica relacionada con ventas/pedidos.

Las métricas exactas del dashboard serán definidas posteriormente.

---

# 16. Requisitos no funcionales

## RNF-001 — Responsive

La aplicación deberá adaptarse correctamente a:

- Computadores.
- Tablets.
- Teléfonos móviles.

## RNF-002 — Identidad visual

La interfaz deberá respetar la identidad visual oficial de Musa.

## RNF-003 — Usabilidad

Las acciones principales de compra deberán ser claras y fáciles de encontrar.

## RNF-004 — Rendimiento

Las páginas deberán cargar de forma eficiente y evitar recursos innecesariamente pesados.

## RNF-005 — Seguridad

Las operaciones administrativas deberán estar protegidas y requerir autenticación y autorización.

## RNF-006 — Protección de contraseñas

Las contraseñas no deberán almacenarse en texto plano.

## RNF-007 — Validación

Los datos enviados por usuarios deberán validarse tanto en frontend como en backend cuando corresponda.

## RNF-008 — Manejo de errores

El sistema deberá mostrar mensajes comprensibles cuando ocurra un error y evitar exponer información técnica sensible al usuario.

## RNF-009 — Mantenibilidad

El código deberá organizarse de forma clara, modular y consistente para facilitar futuras modificaciones.

## RNF-010 — Escalabilidad

La arquitectura deberá permitir agregar nuevos productos, categorías y funcionalidades sin tener que reconstruir el sistema completo.

## RNF-011 — Compatibilidad

La aplicación deberá funcionar correctamente en navegadores modernos.

## RNF-012 — Accesibilidad básica

La interfaz deberá utilizar estructuras semánticas, textos alternativos en imágenes relevantes y controles utilizables.

## RNF-013 — SEO básico

Las páginas públicas deberán contar con una estructura que permita implementar SEO básico.

## RNF-014 — Control de versiones

El código fuente deberá mantenerse bajo Git y alojarse en GitHub.

## RNF-015 — Documentación

Las decisiones técnicas y funcionales importantes deberán quedar documentadas.

## RNF-016 — Privacidad

La aplicación deberá manejar los datos personales de los clientes de forma responsable y conforme a las obligaciones aplicables en Colombia.

---

# 17. Criterios generales de aceptación del MVP

El MVP podrá considerarse funcional cuando un visitante pueda realizar, como mínimo, este flujo completo:

```text
Entrar a Musa
    ↓
Explorar productos
    ↓
Buscar o seleccionar categoría
    ↓
Abrir producto
    ↓
Seleccionar cantidad
    ↓
Personalizar producto
    ↓
Agregar al carrito
    ↓
Revisar carrito
    ↓
Confirmar pedido
    ↓
Generar mensaje de WhatsApp
```

También deberá ser posible:

```text
Administrador
    ↓
Iniciar sesión
    ↓
Gestionar productos
    ↓
Gestionar categorías
    ↓
Consultar pedidos
    ↓
Actualizar estados
```

Y:

```text
Cliente
    ↓
Registrarse
    ↓
Iniciar sesión
    ↓
Realizar pedido
    ↓
Consultar historial
```

---

# 18. Funcionalidades fuera del MVP

Quedan explícitamente fuera de esta versión:

- Pasarela de pagos.
- Integración automática con transportadoras.
- Editor gráfico avanzado.
- Sistema de cupones.
- Sistema de puntos.
- Reviews.
- Aplicación móvil.
- IA para generación de diseños.
- Microservicios.
- Docker.
- Automatizaciones avanzadas.

Estas funcionalidades podrán convertirse en requisitos de versiones posteriores.

---

# 19. Decisiones pendientes

Las siguientes decisiones todavía deben definirse en tareas posteriores:

- Estados exactos de un pedido.
- Campos exactos de un producto.
- Campos exactos de un usuario.
- Reglas detalladas de personalización.
- Formatos y tamaño máximo de imágenes.
- Política de inventario.
- Cálculo de costos de envío.
- Cobertura de entregas.
- Datos exactos enviados a WhatsApp.
- Métricas del dashboard de ventas.
- Diseño final de la interfaz.
- Arquitectura definitiva.
- Modelo de base de datos.

---

# 20. Estado de la tarea

**MUSA-002 — Requisitos funcionales y no funcionales: COMPLETADA ✅**

### Próxima tarea

**MUSA-003 — Casos de uso y flujos de usuario**

En esta tarea se representará cómo interactúan los distintos actores con Musa y se definirán los flujos principales antes de diseñar la arquitectura técnica.
