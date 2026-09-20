# MUSA — Contrato Inicial de API REST

**Documento:** MUSA-006  
**Estado:** Completada  
**Versión:** 1.0  
**Fecha:** 2026-08-17  
**Relacionado con:** MUSA-001, MUSA-002, MUSA-003, MUSA-004 y MUSA-005

---

# 1. Objetivo

Definir el contrato inicial entre el frontend y el backend de Musa.

Este documento establece:

- Endpoints.
- Métodos HTTP.
- Parámetros.
- Request DTOs.
- Response DTOs.
- Códigos HTTP.
- Reglas de acceso.
- Estructura inicial de errores.

El contrato podrá evolucionar durante el desarrollo, pero cualquier cambio importante deberá documentarse.

---

# 2. Convención base

La API utilizará:

```text
/api
```

Ejemplo:

```text
/api/productos
```

Las peticiones y respuestas utilizarán JSON cuando corresponda.

---

# 3. Reglas HTTP

Se utilizarán principalmente:

```text
GET
POST
PUT
DELETE
```

Significado:

```text
GET
→ consultar

POST
→ crear

PUT
→ actualizar

DELETE
→ eliminar/desactivar
```

---

# 4. Productos

## 4.1 Obtener productos

```http
GET /api/productos
```

### Acceso

Público.

### Respuesta

```http
200 OK
```

Ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Mug Personalizado",
    "descripcion": "Mug blanco para sublimación",
    "precio": 25000,
    "stock": 10,
    "personalizable": true,
    "activo": true,
    "categoria": {
      "id": 1,
      "nombre": "Mugs"
    },
    "imagenPrincipal": "/images/mug.jpg"
  }
]
```

---

# 5. Obtener producto por ID

```http
GET /api/productos/{id}
```

Ejemplo:

```http
GET /api/productos/1
```

### Acceso

Público.

### Respuestas

```text
200 OK
404 NOT FOUND
```

---

# 6. Crear producto

```http
POST /api/productos
```

### Acceso

ADMIN.

### Request

```json
{
  "nombre": "Mug Personalizado",
  "descripcion": "Mug blanco para sublimación",
  "precio": 25000,
  "stock": 10,
  "personalizable": true,
  "categoriaId": 1
}
```

### Respuesta

```text
201 CREATED
```

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Mug Personalizado",
  "descripcion": "Mug blanco para sublimación",
  "precio": 25000,
  "stock": 10,
  "personalizable": true,
  "activo": true,
  "categoria": {
    "id": 1,
    "nombre": "Mugs"
  }
}
```

### Nota de implementación (2026-09-17)

Todas las respuestas de `Producto` (listar, obtener por id, crear, actualizar) devuelven la categoría **anidada** (`categoria: { id, nombre }`), no `categoriaId` plano. Esto elimina la inconsistencia que existía entre la sección 4 (que ya mostraba `categoria` anidada) y esta sección. El campo `categoriaId` sigue existiendo, pero únicamente en el **request** de creación/actualización.

El campo `imagenPrincipal` (sección 4) se implementará cuando se construya la entidad `ProductoImagen`; hasta entonces no aparece en las respuestas.

---

# 7. Actualizar producto

```http
PUT /api/productos/{id}
```

### Acceso

ADMIN.

### Request

```json
{
  "nombre": "Mug Personalizado Premium",
  "descripcion": "Mug de cerámica para sublimación",
  "precio": 28000,
  "stock": 15,
  "personalizable": true,
  "activo": true,
  "categoriaId": 1
}
```

### Respuestas

```text
200 OK
404 NOT FOUND
400 BAD REQUEST
```

**Nota (2026-09-20)**: se agregó `activo` al request de actualización (opcional, `true` por defecto). Es la única forma de **reactivar** un producto que fue desactivado — inicialmente el DTO no lo exponía y no existía manera de revertir una desactivación. Lo usa el panel de administración.

---

# 8. Eliminar producto

```http
DELETE /api/productos/{id}
```

### Acceso

ADMIN.

Para el MVP se priorizará la desactivación lógica (equivalente a `PUT` con `activo: false`).

### Respuestas

```text
204 NO CONTENT
404 NOT FOUND
```

---

# 9. Filtrar productos

La API podrá recibir parámetros:

```http
GET /api/productos?categoriaId=1
```

o:

```http
GET /api/productos?nombre=mug
```

o combinar:

```http
GET /api/productos?categoriaId=1&nombre=mug
```

El filtrado exacto se implementará durante la construcción del catálogo.

---

# 10. Categorías

## Obtener categorías

```http
GET /api/categorias
```

Acceso:

```text
Público
```

Respuesta:

```text
200 OK
```

Ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Mugs",
    "descripcion": "Mugs personalizados",
    "imagen": "/images/categorias/mugs.jpg"
  }
]
```

---

# 11. Obtener categoría

```http
GET /api/categorias/{id}
```

Acceso:

```text
Público
```

Respuestas:

```text
200 OK
404 NOT FOUND
```

---

# 12. Crear categoría

```http
POST /api/categorias
```

Acceso:

```text
ADMIN
```

Request:

```json
{
  "nombre": "Mugs",
  "descripcion": "Mugs personalizados"
}
```

Respuesta:

```text
201 CREATED
```

---

# 13. Actualizar categoría

```http
PUT /api/categorias/{id}
```

Acceso:

```text
ADMIN
```

Respuestas:

```text
200 OK
400 BAD REQUEST
404 NOT FOUND
```

**Nota (2026-09-20)**: el request de actualización también acepta `activo` (opcional, `true` por defecto), igual que en Producto — es la forma de reactivar una categoría desactivada. `GET`/respuestas de categoría ahora incluyen `activo` en el cuerpo.

---

# 14. Eliminar categoría

```http
DELETE /api/categorias/{id}
```

Acceso:

```text
ADMIN
```

Se priorizará la desactivación lógica cuando tenga productos asociados.

---

# 15. Pedidos

El pedido será uno de los recursos más importantes.

## Crear pedido

```http
POST /api/pedidos
```

Acceso:

```text
Visitante
Cliente autenticado
```

Esto permite que Musa mantenga el flujo de compra rápida sin registro.

---

# 16. Request de pedido

Ejemplo:

```json
{
  "cliente": {
    "nombre": "Juan",
    "email": "juan@email.com",
    "telefono": "3000000000"
  },
  "entrega": {
    "municipio": "La Ceja",
    "direccion": "Carrera 10 #20-30",
    "metodo": "DOMICILIO_LOCAL"
  },
  "items": [
    {
      "productoId": 1,
      "cantidad": 2,
      "personalizacion": {
        "ocasion": "Cumpleaños",
        "nombre": "Juan",
        "mensaje": "Feliz cumpleaños",
        "imagenUrl": null,
        "disenoId": null,
        "instrucciones": "Texto centrado"
      }
    }
  ]
}
```

El cliente no enviará:

```text
precio
subtotal
total
```

El backend los calculará.

---

# 17. Regla crítica de seguridad del pedido

Nunca confiar en precios enviados por el frontend.

Incorrecto:

```json
{
  "productoId": 1,
  "precio": 100
}
```

El backend hará:

```text
productoId
    ↓
Base de datos
    ↓
precio real
    ↓
cálculo
```

Esto evita manipulación de precios desde el navegador.

---

# 18. Respuesta de creación de pedido

```text
201 CREATED
```

Ejemplo:

```json
{
  "id": 1001,
  "codigo": "MUSA-1001",
  "estado": "PENDIENTE_CONFIRMACION",
  "subtotal": 50000,
  "costoEnvio": 5000,
  "total": 55000,
  "fechaCreacion": "2026-08-17T15:30:00"
}
```

El frontend utilizará el código del pedido para preparar el mensaje de WhatsApp.

---

# 19. Consultar pedido

```http
GET /api/pedidos/{id}
```

Acceso:

```text
ADMIN
Cliente propietario
```

Un cliente no podrá consultar pedidos de otro cliente.

---

# 20. Pedidos del cliente

```http
GET /api/pedidos/mis-pedidos
```

Acceso:

```text
CLIENTE
```

Respuesta:

```text
200 OK
```

**Implementado (2026-09-20)**: `frontend/mis-pedidos.html` — lista los pedidos del cliente (forma resumida, sin items), cada uno expandible para ver el detalle completo (`GET /api/pedidos/{id}`, pedido solo la primera vez que se expande, no de una vez para todos). Enlace "Mis pedidos" visible en el header para cualquier usuario logueado (CLIENTE o ADMIN — el endpoint no está restringido a CLIENTE en el backend, cualquier autenticado ve sus propios pedidos).

---

# 21. Pedidos administrativos

```http
GET /api/admin/pedidos
```

Acceso:

```text
ADMIN
```

Permitirá al administrador consultar los pedidos.

---

# 22. Actualizar estado del pedido

```http
PUT /api/pedidos/{id}/estado
```

Acceso:

```text
ADMIN
```

Request:

```json
{
  "estado": "EN_PREPARACION"
}
```

Respuesta:

```text
200 OK
```

---

# 23. Historial de pedidos

El administrador podrá consultar:

```http
GET /api/admin/pedidos
```

y posteriormente filtros como:

```http
GET /api/admin/pedidos?estado=ENTREGADO
```

o:

```http
GET /api/admin/pedidos?fechaDesde=2026-08-01&fechaHasta=2026-08-17
```

Los filtros avanzados se implementarán cuando construyamos el panel administrativo.

---

# 23.1 Notas de implementación de Pedidos (2026-09-18)

- **`costoEnvio` fijo en `0`** para todos los pedidos del MVP: no existe todavía una estrategia de cálculo de envío (ver MUSA-005 §18). `total = subtotal + costoEnvio` siempre por ahora.
- **No se valida ni descarga stock al crear un pedido** (decisión explícita, pendiente para una siguiente etapa): el campo `stock` del producto no se toca al crear un pedido todavía.
- **`GET /api/pedidos/mis-pedidos`** y **`GET /api/admin/pedidos`** devuelven la forma "resumida" del pedido (igual que la sección 18: sin los items). **`GET /api/pedidos/{id}`** sí devuelve el detalle completo, incluyendo `items` (con su `personalizacion` si la tiene).
- El código del pedido se genera como `"MUSA-" + id` después de guardarlo (el id lo asigna la base de datos).

---

# 23.2 Ventas (implementado 2026-09-20)

```http
GET /api/admin/ventas
```

Acceso:

```text
ADMIN
```

Parámetros opcionales (si se omiten, se calcula sobre todo el histórico):

```http
GET /api/admin/ventas?fechaDesde=2026-09-01&fechaHasta=2026-09-30
```

Respuesta:

```json
{
  "totalPedidos": 12,
  "totalVendido": 480000,
  "pedidosPorEstado": {
    "PENDIENTE_CONFIRMACION": 3,
    "CONFIRMADO": 5,
    "ENTREGADO": 3,
    "CANCELADO": 1
  },
  "productosMasVendidos": [
    { "productoId": 4, "nombre": "Mug Personalizado", "cantidadVendida": 18 }
  ]
}
```

Cubre las métricas que pide MUSA-002 RF-064 / MUSA-003 UC-022: total de pedidos, pedidos por estado, ventas por periodo (vía `fechaDesde`/`fechaHasta`), productos más vendidos (top 5) y total vendido. Los pedidos con estado `CANCELADO` cuentan para `totalPedidos` y `pedidosPorEstado`, pero no para `totalVendido` ni para `productosMasVendidos` — un pedido cancelado no fue una venta real.

---

# 24. Autenticación

## Registro

```http
POST /api/auth/register
```

Request:

```json
{
  "nombre": "Juan",
  "apellido": "Grisales",
  "email": "juan@email.com",
  "password": "********",
  "telefono": "3000000000"
}
```

Respuesta esperada:

```text
201 CREATED
```

---

# 25. Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "juan@email.com",
  "password": "********"
}
```

### Respuesta (2026-09-17: implementado con JWT)

```text
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "tipo": "Bearer",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Grisales",
    "email": "juan@email.com",
    "rol": "CLIENTE"
  }
}
```

El cliente debe enviar el token en cada petición protegida con el header `Authorization: Bearer <token>`. El token expira a las 24 horas. No hay endpoint de "logout" en el servidor: como es stateless, cerrar sesión es responsabilidad del cliente (descartar el token guardado).

`401 UNAUTHORIZED` si el email o la contraseña son incorrectos.

---

# 26. Usuario actual

```http
GET /api/usuarios/me
```

Acceso:

```text
CLIENTE
ADMIN
```

Permitirá obtener la información básica del usuario autenticado.

---

# 27. Actualizar usuario

```http
PUT /api/usuarios/me
```

Acceso:

```text
CLIENTE
ADMIN
```

Los campos modificables se definirán durante la implementación.

**Nota (2026-09-17): no implementado todavía.** Solo se implementó `GET /api/usuarios/me`.

---

# 27.1 Listar usuarios (implementado 2026-09-17)

```http
GET /api/usuarios
```

Acceso:

```text
ADMIN
```

Devuelve la lista completa de usuarios registrados (cumple RF de administrador "Consultar usuarios").

---

# 27.2 Cambiar el rol de un usuario (implementado 2026-09-17)

```http
PUT /api/usuarios/{id}/rol
```

Acceso:

```text
ADMIN
```

Request:

```json
{
  "rol": "ADMIN"
}
```

Respuestas:

```text
200 OK
400 BAD REQUEST  (rol inválido — solo se aceptan CLIENTE o ADMIN)
404 NOT FOUND    (usuario no existe)
```

Es el mecanismo para promover a un cliente existente a administrador. Requiere ya ser ADMIN para usarlo.

### Cómo se crea el primer ADMIN (bootstrap)

Como el endpoint anterior requiere ya ser ADMIN, el primer administrador se crea automáticamente al arrancar el backend si existen las variables de entorno `ADMIN_EMAIL` y `ADMIN_PASSWORD`, y todavía no existe un usuario con ese email. Es idempotente: en arranques posteriores no hace nada si el usuario ya existe. Ver `config/AdminBootstrapConfig`.

---

# 28. Matriz de permisos

| Endpoint | Visitante | Cliente | Admin |
|---|---:|---:|---:|
| GET productos | ✅ | ✅ | ✅ |
| GET producto | ✅ | ✅ | ✅ |
| POST producto | ❌ | ❌ | ✅ |
| PUT producto | ❌ | ❌ | ✅ |
| DELETE producto | ❌ | ❌ | ✅ |
| GET categorías | ✅ | ✅ | ✅ |
| POST categoría | ❌ | ❌ | ✅ |
| PUT categoría | ❌ | ❌ | ✅ |
| DELETE categoría | ❌ | ❌ | ✅ |
| POST pedido | ✅ | ✅ | ✅ |
| GET pedido propio | ❌ | ✅ | ✅ |
| GET todos pedidos | ❌ | ❌ | ✅ |
| PUT estado pedido | ❌ | ❌ | ✅ |
| Registro | ✅ | — | — |
| Login | ✅ | — | — |
| GET usuario actual | ❌ | ✅ | ✅ |
| GET todos los usuarios | ❌ | ❌ | ✅ |
| PUT rol de usuario | ❌ | ❌ | ✅ |

---

# 29. Estructura de errores

La API utilizará inicialmente una estructura consistente:

```json
{
  "timestamp": "2026-08-17T15:30:00",
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Producto no encontrado",
  "path": "/api/productos/999"
}
```

**Implementado (2026-09-18)**: `exception/ManejadorGlobalExcepciones.java` (`@RestControllerAdvice`) centraliza este formato para toda excepción `ResponseStatusException` y para los errores de validación (`@Valid`), incluyendo siempre el campo `message`. Antes de esto, intentamos activar `server.error.include-message=always`, pero no era confiable para excepciones lanzadas desde el código de negocio — el manejador global es la solución correcta y ya no depende de ese comportamiento por defecto de Spring Boot.

---

# 30. Validación

Los requests deberán validarse en backend.

Ejemplo:

```text
nombre obligatorio
email válido
precio >= 0
stock >= 0
cantidad > 0
categoriaId existente
```

La validación del frontend será útil para UX, pero la validación definitiva siempre estará en backend.

---

# 31. Códigos HTTP

| Código | Uso |
|---:|---|
| 200 | Consulta/actualización exitosa |
| 201 | Recurso creado |
| 204 | Operación exitosa sin contenido |
| 400 | Datos inválidos |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | Recurso no encontrado |
| 409 | Conflicto |
| 500 | Error interno |

---

# 32. Convenciones

Los endpoints utilizarán nombres de recursos en plural:

```text
/productos
/categorias
/pedidos
/usuarios
```

No:

```text
/getProductos
/crearProducto
/eliminarProducto
```

El verbo está representado por HTTP:

```text
GET
POST
PUT
DELETE
```

---

# 33. Flujo completo de compra

```text
Cliente
   │
   ▼
Catálogo
   │
   ▼
Producto
   │
   ▼
Personalización
   │
   ▼
Carrito
   │
   ▼
POST /api/pedidos
   │
   ▼
Backend valida
   │
   ▼
Backend calcula
   │
   ▼
Pedido creado
   │
   ▼
Código MUSA-1001
   │
   ▼
WhatsApp
   │
   ▼
Confirmación
   │
   ▼
Pago
```

---

# 34. Principio importante

El frontend puede solicitar:

```text
"Quiero comprar 2 mugs"
```

pero el backend decide:

```text
¿Existe el producto?
¿Está activo?
¿Hay stock?
¿Cuánto cuesta?
¿Es personalizable?
¿Los datos son válidos?
¿Cuánto vale el pedido?
```

Esto mantiene las reglas críticas bajo control del servidor.

---

# 35. Estado de la tarea

**MUSA-006 — Contrato inicial de API REST: COMPLETADA ✅**

## Próxima tarea

**MUSA-007 — Preparación del entorno de desarrollo**

Objetivos:

```text
1. Verificar Java
2. Verificar Maven
3. Verificar Node.js/npm
4. Verificar Git
5. Verificar MySQL
6. Preparar VS Code
7. Crear repositorio Git
8. Crear estructura inicial de Musa
9. Crear proyecto Spring Boot
10. Crear proyecto frontend
11. Crear README
12. Crear CLAUDE.md
```

A partir de MUSA-007 comenzará la implementación real.
