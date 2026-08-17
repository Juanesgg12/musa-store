# MUSA — Diseño de Base de Datos

**Documento:** MUSA-005  
**Estado:** Completada  
**Versión:** 1.0  
**Fecha:** 2026-08-17  
**Relacionado con:** MUSA-001, MUSA-002, MUSA-003 y MUSA-004

---

# 1. Objetivo

Diseñar el modelo de datos inicial de Musa antes de implementar la base de datos MySQL y las entidades JPA del backend.

El diseño busca ser claro, normalizado, mantenible, adecuado para el MVP y preparado para crecer.

---

# 2. Entidades principales

El modelo inicial estará compuesto por:

```text
Usuario
Rol
Categoria
Producto
ProductoImagen
Pedido
PedidoItem
Personalizacion
```

Una entidad `Diseño` podrá incorporarse cuando la biblioteca de diseños de Musa forme parte del MVP.

---

# 3. Relación general

```text
ROL
 │ 1
 │
 │ N
 ▼
USUARIO
 │ 1
 │
 │ N
 ▼
PEDIDO
 │ 1
 │
 │ N
 ▼
PEDIDO_ITEM
 │ N                 │ 1
 │                   ▼
 │              PERSONALIZACION
 │
 │ N
 ▼
PRODUCTO
 │ N
 │
 │ 1
 ▼
CATEGORIA

PRODUCTO
 │ 1
 │
 │ N
 ▼
PRODUCTO_IMAGEN
```

---

# 4. Usuario

## Propósito

Representar a los clientes registrados y administradores.

### Campos iniciales

```text
Usuario
├── id
├── nombre
├── apellido
├── email
├── password
├── telefono
├── activo
├── fechaCreacion
└── fechaActualizacion
```

### Reglas

- `id` será la clave primaria.
- `email` será único.
- `password` nunca se almacenará en texto plano.
- `activo` permitirá desactivar una cuenta sin eliminarla físicamente.

---

# 5. Rol

## Propósito

Definir los permisos generales del usuario.

### Campos

```text
Rol
├── id
└── nombre
```

### Valores iniciales

```text
CLIENTE
ADMIN
```

### Relación

```text
ROL 1 ─────── N USUARIO
```

Un usuario tendrá inicialmente un rol principal.

---

# 6. Categoría

## Propósito

Agrupar productos.

### Campos iniciales

```text
Categoria
├── id
├── nombre
├── descripcion
├── imagen
├── activo
├── fechaCreacion
└── fechaActualizacion
```

### Ejemplos

```text
Mugs
Vasos
Termos
Camisetas
Gorras
Cuadros
Rompecabezas
Llaveros
Manillas
Mouse Pads
Ruanas
```

### Relación

```text
CATEGORIA 1 ─────── N PRODUCTO
```

Un producto pertenecerá inicialmente a una sola categoría.

---

# 7. Producto

## Propósito

Representar un producto que Musa puede vender.

### Campos iniciales

```text
Producto
├── id
├── nombre
├── descripcion
├── precio
├── stock
├── personalizable
├── activo
├── categoria_id
├── fechaCreacion
└── fechaActualizacion
```

### Decisiones

El precio se manejará con precisión decimal. En Java se utilizará `BigDecimal` y en MySQL `DECIMAL`.

No se utilizará `float` o `double` para dinero.

El MVP tendrá un control de stock básico.

`personalizable` indicará si el producto admite personalización.

---

# 8. ProductoImagen

## Propósito

Permitir múltiples imágenes por producto.

### Campos

```text
ProductoImagen
├── id
├── url
├── altText
├── orden
├── principal
└── producto_id
```

### Relación

```text
PRODUCTO 1 ─────── N PRODUCTO_IMAGEN
```

Esto evita guardar varias URLs en una única columna.

---

# 9. Pedido

## Propósito

Representar una solicitud de compra.

### Campos iniciales

```text
Pedido
├── id
├── codigo
├── usuario_id
├── nombreCliente
├── emailCliente
├── telefonoCliente
├── direccionEntrega
├── municipioEntrega
├── metodoEntrega
├── subtotal
├── costoEnvio
├── total
├── estado
├── fechaCreacion
└── fechaActualizacion
```

---

# 10. ¿Por qué guardar datos del cliente dentro del pedido?

Aunque un cliente registrado tenga información en `USUARIO`, el pedido debe conservar los datos utilizados al momento de la compra.

Ejemplo:

```text
Usuario
telefono = 3001111111

Pedido #1001
telefonoCliente = 3001111111
```

Si posteriormente el usuario cambia su teléfono, el pedido histórico seguirá conservando el valor original.

Esto protege la integridad histórica del pedido.

---

# 11. Pedido y usuario

Un cliente registrado puede tener muchos pedidos:

```text
USUARIO 1 ─────── N PEDIDO
```

Pero un visitante puede comprar sin cuenta.

Por ello:

```text
Pedido.usuario_id = NULL
```

será válido para pedidos de visitantes.

---

# 12. PedidoItem

## Propósito

Representar cada producto dentro de un pedido.

Ejemplo:

```text
Pedido #1001

1 Mug
2 Llaveros
1 Termo
```

Se utilizará:

```text
PEDIDO
   │
   ├── PEDIDO_ITEM
   ├── PEDIDO_ITEM
   └── PEDIDO_ITEM
```

### Campos

```text
PedidoItem
├── id
├── pedido_id
├── producto_id
├── nombreProducto
├── precioUnitario
├── cantidad
└── subtotal
```

---

# 13. ¿Por qué guardar nombre y precio dentro de PedidoItem?

Si un producto cambia de precio después de una compra, el pedido histórico no debe cambiar.

Ejemplo:

```text
Producto
precio = 25.000
```

Pedido:

```text
PedidoItem
precioUnitario = 25.000
```

Después:

```text
Producto
precio = 30.000
```

El pedido continuará mostrando:

```text
25.000
```

También se conservará el nombre del producto utilizado en ese momento.

---

# 14. Personalizacion

## Propósito

Guardar la información específica solicitada para un producto del pedido.

### Campos iniciales

```text
Personalizacion
├── id
├── pedido_item_id
├── ocasion
├── nombre
├── mensaje
├── imagenUrl
├── diseñoId
└── instrucciones
```

### Relación

```text
PEDIDO_ITEM 1 ─────── 0..1 PERSONALIZACION
```

Un elemento de pedido puede no tener personalización o tener una.

---

# 15. ¿Por qué Personalizacion pertenece a PedidoItem?

Supongamos:

```text
Pedido #1001

2 Mugs
```

Cada mug puede tener una personalización diferente:

```text
Mug 1
→ "Feliz cumpleaños Juan"

Mug 2
→ "Te amo María"
```

Por eso la personalización debe pertenecer al `PedidoItem`, no directamente al pedido.

```text
Pedido
│
├── PedidoItem
│    └── Personalizacion
│
└── PedidoItem
     └── Personalizacion
```

---

# 16. Diseños de Musa

Si Musa desarrolla una biblioteca propia de diseños, posteriormente podremos crear:

```text
Diseño
├── id
├── nombre
├── descripcion
├── imagenUrl
└── activo
```

y relacionarlo con personalizaciones.

La entidad completa `Diseño` no se implementará todavía para evitar complejidad innecesaria.

---

# 17. Estados de pedido

Estados iniciales:

```text
PENDIENTE_CONFIRMACION
CONFIRMADO
EN_PREPARACION
LISTO
ENVIADO
ENTREGADO
CANCELADO
```

Flujo habitual:

```text
PENDIENTE_CONFIRMACION
          ↓
      CONFIRMADO
          ↓
    EN_PREPARACION
          ↓
         LISTO
          ↓
       ENVIADO
          ↓
      ENTREGADO
```

Un pedido local puede seguir:

```text
LISTO → ENTREGADO
```

---

# 18. Método de entrega

Inicialmente:

```text
DOMICILIO_LOCAL
TRANSPORTADORA
```

Posteriormente podrían agregarse:

```text
RECOGIDA_EN_PUNTO
OTRO
```

La estrategia completa de envíos se desarrollará posteriormente.

---

# 19. Dirección de entrega

Para el MVP se almacenará directamente en el pedido:

```text
direccionEntrega
municipioEntrega
```

Esto evita crear inicialmente un sistema complejo de direcciones.

Si Musa crece, podremos crear una entidad `Direccion` asociada a los usuarios.

---

# 20. Relaciones completas

```text
ROL
  │
  │ 1:N
  ▼
USUARIO
  │
  │ 1:N
  ▼
PEDIDO
  │
  │ 1:N
  ▼
PEDIDO_ITEM
  │              │
  │ N:1          │ 1:0..1
  ▼              ▼
PRODUCTO     PERSONALIZACION
  │
  │ N:1
  ▼
CATEGORIA

PRODUCTO
  │
  │ 1:N
  ▼
PRODUCTO_IMAGEN
```

---

# 21. Modelo relacional preliminar

```text
ROL
-------------------------
id PK
nombre UNIQUE


USUARIO
-------------------------
id PK
nombre
apellido
email UNIQUE
password
telefono
activo
fecha_creacion
fecha_actualizacion
rol_id FK


CATEGORIA
-------------------------
id PK
nombre
descripcion
imagen
activo
fecha_creacion
fecha_actualizacion


PRODUCTO
-------------------------
id PK
nombre
descripcion
precio
stock
personalizable
activo
categoria_id FK
fecha_creacion
fecha_actualizacion


PRODUCTO_IMAGEN
-------------------------
id PK
url
alt_text
orden
principal
producto_id FK


PEDIDO
-------------------------
id PK
codigo UNIQUE
usuario_id FK NULL
nombre_cliente
email_cliente
telefono_cliente
direccion_entrega
municipio_entrega
metodo_entrega
subtotal
costo_envio
total
estado
fecha_creacion
fecha_actualizacion


PEDIDO_ITEM
-------------------------
id PK
pedido_id FK
producto_id FK
nombre_producto
precio_unitario
cantidad
subtotal


PERSONALIZACION
-------------------------
id PK
pedido_item_id FK UNIQUE
ocasion
nombre
mensaje
imagen_url
diseno_id NULL
instrucciones
```

---

# 22. Cardinalidades

| Relación | Cardinalidad |
|---|---|
| Rol → Usuario | 1:N |
| Usuario → Pedido | 1:N |
| Categoría → Producto | 1:N |
| Producto → ProductoImagen | 1:N |
| Pedido → PedidoItem | 1:N |
| Producto → PedidoItem | 1:N |
| PedidoItem → Personalizacion | 1:0..1 |
| Diseño → Personalizacion | 1:N, cuando Diseño sea implementado |

---

# 23. Reglas de integridad

- El email de usuario debe ser único.
- El código de pedido debe ser único.
- Un pedido debe tener al menos un `PedidoItem`.
- La cantidad de un `PedidoItem` debe ser mayor que cero.
- El precio de un producto no puede ser negativo.
- El stock no puede ser negativo.
- Un producto debe pertenecer a una categoría válida.
- Una imagen debe pertenecer a un producto existente.
- Una personalización debe pertenecer a un `PedidoItem` existente.
- Un pedido puede no tener usuario registrado.

---

# 24. Normalización

Se evitarán datos repetidos innecesariamente.

En lugar de:

```text
Producto
imagen1
imagen2
imagen3
```

utilizaremos:

```text
Producto
   │
   ├── Imagen
   ├── Imagen
   └── Imagen
```

De igual forma, un pedido tendrá múltiples `PedidoItem` en lugar de almacenar todos sus productos en una sola columna.

---

# 25. Dinero

Los campos:

```text
precio
precioUnitario
subtotal
costoEnvio
total
```

utilizarán precisión decimal.

En Java:

```java
BigDecimal
```

En MySQL:

```sql
DECIMAL
```

Nunca utilizaremos `float` o `double` para valores monetarios.

---

# 26. Eliminación de registros

Para productos, categorías y usuarios se priorizará inicialmente la desactivación lógica mediante:

```text
activo = true / false
```

Esto permite conservar información histórica relacionada con pedidos.

---

# 27. Diagrama conceptual

```text
                         ┌─────────────┐
                         │     ROL     │
                         └──────┬──────┘
                                │ 1:N
                                ▼
                         ┌─────────────┐
                         │   USUARIO   │
                         └──────┬──────┘
                                │ 1:N
                                ▼
                         ┌─────────────┐
                         │   PEDIDO    │
                         └──────┬──────┘
                                │ 1:N
                                ▼
                      ┌──────────────────┐
                      │    PEDIDO_ITEM   │
                      └──────┬─────┬─────┘
                             │     │
                           N:1     │ 1:0..1
                             │     ▼
                             │ ┌─────────────────┐
                             │ │ PERSONALIZACION │
                             │ └─────────────────┘
                             ▼
                       ┌─────────────┐
                       │  PRODUCTO   │
                       └──────┬──────┘
                              │ N:1
                              ▼
                       ┌─────────────┐
                       │  CATEGORIA  │
                       └─────────────┘

                       PRODUCTO
                          │ 1:N
                          ▼
                   PRODUCTO_IMAGEN
```

---

# 28. Funcionalidades futuras que pueden requerir cambios

No se implementarán todavía:

- Sistema avanzado de inventario.
- Historial de precios.
- Cupones.
- Promociones.
- Reviews.
- Wishlist.
- Direcciones múltiples.
- Biblioteca avanzada de diseños.
- Variantes complejas de productos.
- Integración automática con transportadoras.
- Pagos online.

Estas funcionalidades podrán requerir nuevas entidades o modificaciones del modelo.

---

# 29. Próximo paso

El modelo seguirá este camino:

```text
Modelo conceptual
       ↓
Modelo relacional
       ↓
SQL MySQL
       ↓
Entidades JPA
       ↓
Repositories
       ↓
Services
       ↓
Controllers
```

No saltaremos directamente al código.

Primero definiremos el contrato de comunicación entre frontend y backend.

---

# 30. Estado de la tarea

**MUSA-005 — Diseño de la base de datos: COMPLETADA ✅**

### Próxima tarea

**MUSA-006 — Contrato inicial de la API REST**

Se definirá:

- Endpoints.
- Métodos HTTP.
- Parámetros.
- Request DTOs.
- Response DTOs.
- Códigos HTTP.
- Estructura de errores.
- Reglas de acceso.

Después de MUSA-006 podremos comenzar a preparar el proyecto backend y frontend real.
