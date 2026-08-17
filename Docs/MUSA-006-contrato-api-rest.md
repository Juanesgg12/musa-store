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
  "categoriaId": 1
}
```

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
  "categoriaId": 1
}
```

### Respuestas

```text
200 OK
404 NOT FOUND
400 BAD REQUEST
```

---

# 8. Eliminar producto

```http
DELETE /api/productos/{id}
```

### Acceso

ADMIN.

Para el MVP se priorizará la desactivación lógica.

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

Posteriormente:

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

La respuesta definitiva dependerá de la estrategia de autenticación seleccionada durante la implementación de seguridad.

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

La implementación definitiva se realizará mediante un manejador global de excepciones en Spring Boot.

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
