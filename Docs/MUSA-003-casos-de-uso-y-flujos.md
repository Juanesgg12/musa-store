# MUSA — Casos de Uso y Flujos de Usuario

**Documento:** MUSA-003  
**Estado:** Completada  
**Versión:** 1.0  
**Fecha:** 2026-08-16  
**Relacionado con:** MUSA-001 — Definición del Producto / MUSA-002 — Requisitos

---

# 1. Objetivo

Este documento describe cómo interactúan los diferentes actores con el sistema Musa.

Los casos de uso permiten pasar de los requisitos funcionales a comportamientos concretos del sistema antes de diseñar la arquitectura y comenzar a programar.

La pregunta principal de esta etapa es:

> **¿Qué puede hacer cada tipo de usuario dentro de Musa y qué ocurre cuando lo hace?**

---

# 2. Actores del sistema

## 2.1 Visitante

Persona que entra a Musa sin iniciar sesión.

Puede:

- Ver productos.
- Buscar productos.
- Explorar categorías.
- Ver detalles.
- Personalizar productos.
- Utilizar el carrito.
- Generar un pedido.
- Enviar el pedido a WhatsApp.
- Registrarse si desea crear una cuenta.

---

## 2.2 Cliente registrado

Usuario que tiene una cuenta en Musa.

Puede realizar todas las acciones de un visitante y además:

- Iniciar sesión.
- Gestionar sus datos.
- Consultar sus pedidos.
- Consultar historial de compras.

---

## 2.3 Administrador

Usuario con permisos administrativos.

Puede:

- Gestionar productos.
- Gestionar categorías.
- Gestionar pedidos.
- Gestionar usuarios.
- Consultar información de ventas.

---

## 2.4 WhatsApp

Servicio externo utilizado para recibir la información del pedido.

Musa no realizará inicialmente una integración empresarial compleja con WhatsApp.

El sistema preparará la información del pedido y dirigirá al cliente hacia un chat de WhatsApp.

---

# 3. Mapa general de casos de uso

```text
                         ┌──────────────────────┐
                         │        MUSA          │
                         │                      │
Visitante ──────────────►│ Ver catálogo         │
       │                 │ Buscar productos     │
       │                 │ Ver producto         │
       │                 │ Personalizar         │
       │                 │ Gestionar carrito    │
       │                 │ Crear pedido         │
       │                 │ Enviar a WhatsApp    │
       │                 │ Registrarse          │
       │                 └──────────────────────┘
       │
Cliente ────────────────► Todo lo anterior
       │
       └────────────────► Login
                         Gestionar cuenta
                         Ver historial

Administrador ─────────► Login
                         Productos
                         Categorías
                         Pedidos
                         Usuarios
                         Ventas

Musa ──────────────────► WhatsApp
```

---

# 4. Casos de uso del visitante

## UC-001 — Explorar catálogo

**Actor principal:** Visitante / Cliente

### Objetivo

Permitir que una persona consulte los productos disponibles.

### Precondiciones

- El sistema está disponible.

### Flujo principal

1. El usuario entra a Musa.
2. El sistema muestra la página de inicio.
3. El usuario selecciona Productos.
4. El sistema consulta los productos disponibles.
5. El sistema muestra el catálogo.
6. El usuario puede seleccionar un producto.

### Resultado

El usuario puede explorar el catálogo.

---

## UC-002 — Buscar producto

**Actor principal:** Visitante / Cliente

### Objetivo

Encontrar rápidamente un producto.

### Flujo principal

1. El usuario introduce un término en el buscador.
2. El sistema recibe el texto.
3. El sistema busca coincidencias.
4. El sistema muestra los productos encontrados.
5. El usuario selecciona un producto.

### Flujo alternativo

Si no existen coincidencias:

1. El sistema informa que no encontró productos.
2. El usuario puede realizar una nueva búsqueda.

---

## UC-003 — Filtrar por categoría

**Actor principal:** Visitante / Cliente

### Flujo principal

1. El usuario abre las categorías.
2. Selecciona una categoría.
3. El sistema consulta los productos asociados.
4. El sistema muestra los productos correspondientes.

---

## UC-004 — Ver detalle de producto

**Actor principal:** Visitante / Cliente

### Objetivo

Consultar la información completa de un producto.

### Flujo principal

1. El usuario selecciona un producto.
2. El sistema muestra:
   - Nombre.
   - Imágenes.
   - Descripción.
   - Precio.
   - Categoría.
   - Disponibilidad.
   - Opciones de personalización.
3. El usuario decide si desea comprarlo.

---

# 5. Casos de uso de personalización

## UC-005 — Personalizar producto

**Actor principal:** Visitante / Cliente

### Objetivo

Permitir que el cliente agregue información personalizada a un producto.

### Precondiciones

- El producto debe permitir personalización.

### Flujo principal

1. El usuario abre un producto.
2. Selecciona la opción de personalizar.
3. El sistema muestra las opciones disponibles.
4. El usuario selecciona una ocasión si corresponde.
5. Introduce un nombre si lo desea.
6. Introduce un mensaje si lo desea.
7. Adjunta una imagen si el producto lo permite.
8. Selecciona un diseño de Musa si corresponde.
9. El sistema valida la información.
10. El usuario confirma la personalización.
11. La personalización queda asociada al producto.

### Resultado

El producto queda preparado para ser agregado al carrito con su información personalizada.

---

## UC-006 — Seleccionar diseño de Musa

**Actor principal:** Visitante / Cliente

### Flujo principal

1. El usuario abre un producto personalizable.
2. Selecciona diseños disponibles.
3. El sistema muestra los diseños compatibles.
4. El usuario selecciona uno.
5. El diseño queda asociado al producto.

### Futuro

En versiones posteriores se podrá evaluar un editor visual avanzado.

---

# 6. Casos de uso del carrito

## UC-007 — Agregar producto al carrito

**Actor principal:** Visitante / Cliente

### Flujo principal

1. El usuario selecciona un producto.
2. Selecciona la cantidad.
3. Selecciona opciones de personalización si corresponde.
4. Selecciona Agregar al carrito.
5. El sistema valida la información.
6. El producto se agrega al carrito.
7. El sistema actualiza el total.

### Resultado

El producto aparece en el carrito.

---

## UC-008 — Consultar carrito

**Actor principal:** Visitante / Cliente

### Flujo principal

1. El usuario abre el carrito.
2. El sistema muestra los productos.
3. El sistema muestra cantidades.
4. El sistema muestra precios.
5. El sistema muestra subtotales.
6. El sistema muestra el total.

---

## UC-009 — Modificar carrito

**Actor principal:** Visitante / Cliente

El usuario podrá:

- Aumentar cantidad.
- Disminuir cantidad.
- Eliminar productos.

El sistema deberá recalcular el total después de cada modificación.

---

# 7. Caso de uso principal: generar pedido

## UC-010 — Generar pedido

**Actor principal:** Visitante / Cliente

### Objetivo

Convertir el carrito en una solicitud de pedido.

### Flujo principal

1. El usuario revisa el carrito.
2. Selecciona continuar/confirmar pedido.
3. El sistema solicita los datos necesarios.
4. El usuario proporciona sus datos.
5. El sistema valida la información.
6. El sistema crea el pedido.
7. El pedido recibe un identificador.
8. El sistema asigna el estado inicial.
9. El sistema prepara el mensaje de WhatsApp.
10. El sistema ofrece continuar hacia WhatsApp.

### Resultado

El pedido queda registrado y listo para ser gestionado por Musa.

---

# 8. UC-011 — Comprar sin registrarse

**Actor principal:** Visitante

### Objetivo

Permitir una compra rápida sin crear una cuenta.

### Flujo

```text
Visitante
   ↓
Producto
   ↓
Personalización
   ↓
Carrito
   ↓
Datos de contacto
   ↓
Crear pedido
   ↓
WhatsApp
```

### Regla

El visitante no necesita crear una cuenta para completar este flujo.

---

# 9. UC-012 — Enviar pedido a WhatsApp

**Actor principal:** Visitante / Cliente  
**Actor secundario:** WhatsApp

### Flujo principal

1. Musa genera el pedido.
2. Musa prepara un mensaje.
3. El mensaje contiene información relevante, como:
   - Identificador del pedido.
   - Productos.
   - Cantidades.
   - Personalizaciones.
   - Total.
   - Datos básicos del cliente.
4. El usuario selecciona continuar hacia WhatsApp.
5. Se abre el chat correspondiente.
6. El usuario envía el mensaje.

### Resultado

Musa recibe la solicitud de compra por WhatsApp.

### Importante

En el MVP, el envío del mensaje será iniciado por el usuario. No se considera una automatización completa mediante la API de WhatsApp Business.

---

# 10. Registro e inicio de sesión

## UC-013 — Crear cuenta

**Actor principal:** Visitante

### Flujo principal

1. El usuario selecciona crear cuenta.
2. El sistema muestra el formulario.
3. El usuario introduce sus datos.
4. El sistema valida los datos.
5. El sistema verifica que la cuenta pueda registrarse.
6. El sistema almacena la información.
7. La cuenta queda creada.

### Resultado

El usuario puede iniciar sesión.

---

## UC-014 — Iniciar sesión

**Actor principal:** Cliente / Administrador

### Flujo principal

1. El usuario introduce sus credenciales.
2. El sistema valida las credenciales.
3. El sistema identifica el rol.
4. El sistema crea la sesión/autenticación correspondiente.
5. El usuario accede a las funciones permitidas por su rol.

### Resultado

El usuario queda autenticado.

---

## UC-015 — Cerrar sesión

**Actor principal:** Cliente / Administrador

1. El usuario selecciona cerrar sesión.
2. El sistema invalida la sesión/autenticación.
3. El usuario deja de tener acceso a las funciones protegidas.

---

# 11. Gestión de cuenta

## UC-016 — Gestionar datos personales

**Actor principal:** Cliente

### Flujo

1. El cliente inicia sesión.
2. Accede a su cuenta.
3. Consulta sus datos.
4. Modifica los datos permitidos.
5. Guarda los cambios.
6. El sistema valida y actualiza la información.

---

## UC-017 — Consultar historial de pedidos

**Actor principal:** Cliente

### Flujo

1. El cliente inicia sesión.
2. Accede a Mis pedidos.
3. El sistema consulta sus pedidos.
4. El sistema muestra el historial.
5. El cliente selecciona un pedido.
6. El sistema muestra el detalle.

---

# 12. Casos de uso del administrador

## UC-018 — Gestionar productos

**Actor principal:** Administrador

El administrador podrá:

```text
Crear
  ↓
Consultar
  ↓
Editar
  ↓
Desactivar / Eliminar
```

### Crear producto

1. El administrador inicia sesión.
2. Accede al panel.
3. Selecciona Productos.
4. Selecciona Crear.
5. Introduce los datos.
6. Selecciona categoría.
7. Configura personalización.
8. Agrega imágenes.
9. Guarda.
10. El sistema valida.
11. El producto queda registrado.

### Editar producto

1. El administrador busca el producto.
2. Abre el producto.
3. Modifica información.
4. Guarda.
5. El sistema valida.
6. Se actualiza el producto.

### Eliminar/desactivar producto

1. El administrador selecciona un producto.
2. Solicita eliminar/desactivar.
3. El sistema solicita confirmación.
4. El administrador confirma.
5. El sistema ejecuta la operación.

---

## UC-019 — Gestionar categorías

**Actor principal:** Administrador

Puede:

- Crear categorías.
- Consultar categorías.
- Editar categorías.
- Eliminar/desactivar categorías.

### Regla importante

No se deberá permitir eliminar una categoría que genere inconsistencias con productos existentes. La estrategia exacta se definirá durante el diseño de la base de datos.

---

## UC-020 — Gestionar pedidos

**Actor principal:** Administrador

### Flujo principal

1. El administrador inicia sesión.
2. Accede a Pedidos.
3. El sistema muestra los pedidos.
4. El administrador selecciona un pedido.
5. Consulta el detalle.
6. Puede actualizar su estado.
7. El sistema registra el cambio.

---

# 13. Estados preliminares de un pedido

Estos estados son una propuesta inicial y serán revisados en una tarea posterior:

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

Estado alternativo:

```text
CANCELADO
```

### Nota

No todos los pedidos necesariamente pasarán por `ENVIADO`.

Por ejemplo, un pedido entregado mediante domicilio local podría pasar de:

```text
LISTO → ENTREGADO
```

---

# 14. UC-021 — Gestionar usuarios

**Actor principal:** Administrador

El administrador podrá:

- Consultar usuarios.
- Ver información básica.
- Gestionar cuentas según los permisos definidos.

El administrador no deberá poder consultar información que no sea necesaria para la administración del sistema.

---

# 15. UC-022 — Consultar ventas

**Actor principal:** Administrador

### Flujo

1. El administrador inicia sesión.
2. Accede al dashboard.
3. El sistema consulta información de pedidos/ventas.
4. El sistema muestra métricas básicas.

### Métricas futuras

Podrán incluir:

- Total de pedidos.
- Pedidos por estado.
- Ventas por periodo.
- Productos más vendidos.
- Total vendido.

Las métricas definitivas se definirán posteriormente.

---

# 16. Flujo completo del visitante

El flujo principal del MVP será:

```text
                 ENTRAR A MUSA
                      │
                      ▼
                    INICIO
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
        BUSCAR              CATEGORÍAS
            │                   │
            └─────────┬─────────┘
                      ▼
                   PRODUCTO
                      │
                      ▼
                ¿Personalizar?
                 /                         Sí            No
               │              │
               ▼              │
        PERSONALIZACIÓN       │
               │              │
               └──────┬───────┘
                      ▼
                  CANTIDAD
                      │
                      ▼
                    CARRITO
                      │
                      ▼
              CONFIRMAR PEDIDO
                      │
                      ▼
                DATOS CLIENTE
                      │
                      ▼
                CREAR PEDIDO
                      │
                      ▼
                  WHATSAPP
                      │
                      ▼
              CONFIRMACIÓN MUSA
                      │
                      ▼
                     PAGO
```

---

# 17. Flujo del cliente registrado

```text
              CREAR CUENTA
                    │
                    ▼
                 LOGIN
                    │
                    ▼
                  MUSA
                    │
          ┌─────────┴──────────┐
          ▼                    ▼
       COMPRAR             MI CUENTA
          │                    │
          ▼                    ▼
       PEDIDO              MIS PEDIDOS
                               │
                               ▼
                           HISTORIAL
```

---

# 18. Flujo del administrador

```text
                  LOGIN
                    │
                    ▼
             PANEL ADMINISTRATIVO
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
    PRODUCTOS   CATEGORÍAS    PEDIDOS
        │           │            │
        ▼           ▼            ▼
    CRUD         CRUD        ESTADOS
                                 │
                                 ▼
                             HISTORIAL

                    │
                    ▼
                 USUARIOS

                    │
                    ▼
                  VENTAS
```

---

# 19. Reglas de negocio iniciales

## RN-001 — Compra sin cuenta

Un visitante podrá realizar un pedido sin registrarse.

## RN-002 — Personalización

Solo los productos configurados como personalizables podrán mostrar opciones de personalización.

## RN-003 — Producto

Un producto deberá pertenecer a una categoría activa, según las reglas que se definan en el modelo de datos.

## RN-004 — Pedido

Un pedido deberá contener al menos un producto.

## RN-005 — Cantidad

La cantidad de un producto deberá ser mayor que cero.

## RN-006 — Administrador

Solo un usuario con rol ADMIN podrá acceder a las funciones administrativas.

## RN-007 — Cliente

Un cliente solamente podrá consultar sus propios pedidos.

## RN-008 — Precio

El precio utilizado en un pedido deberá quedar registrado para conservar el valor aplicado al momento de la compra.

## RN-009 — Personalización

La información de personalización deberá quedar asociada al elemento correspondiente del pedido.

## RN-010 — WhatsApp

El pedido deberá existir antes de generar el mensaje final de WhatsApp.

---

# 20. Decisiones pendientes detectadas

Durante el análisis de casos de uso aparecen varias decisiones que deberán resolverse antes de determinadas etapas:

### Pedido

- Estados definitivos.
- ¿Se puede editar después de enviarlo?
- ¿Cuándo se considera una venta?
- ¿Cómo se cancela?

### Personalización

- Formatos de imagen.
- Tamaño máximo.
- ¿La imagen será obligatoria en ciertos productos?
- ¿Qué opciones dependen del producto?

### Usuarios

- Campos obligatorios.
- Recuperación de contraseña.
- Verificación de correo.
- Inicio de sesión con Google u otros proveedores.

### Entregas

- Dirección.
- Ciudad/municipio.
- Método de entrega.
- Costo.
- Cobertura.

Estas decisiones serán tratadas en tareas específicas y no deben bloquear el avance actual.

---

# 21. Relación con requisitos

Los casos de uso principales cubren los requisitos definidos en MUSA-002:

```text
Catálogo
    → UC-001
    → UC-002
    → UC-003
    → UC-004

Personalización
    → UC-005
    → UC-006

Carrito
    → UC-007
    → UC-008
    → UC-009

Pedidos
    → UC-010
    → UC-011
    → UC-012

Usuarios
    → UC-013
    → UC-014
    → UC-015
    → UC-016
    → UC-017

Administración
    → UC-018
    → UC-019
    → UC-020
    → UC-021
    → UC-022
```

---

# 22. Estado de la tarea

**MUSA-003 — Casos de uso y flujos de usuario: COMPLETADA ✅**

### Próxima tarea

**MUSA-004 — Diseño de la arquitectura del sistema**

En esta etapa se definirá cómo se dividirá Musa técnicamente:

```text
Frontend
    ↓
API REST
    ↓
Backend Spring Boot
    ↓
Base de datos MySQL
```

También se definirá:

- Responsabilidad del frontend.
- Responsabilidad del backend.
- Comunicación HTTP/REST.
- Capas del backend.
- Estructura general del proyecto.
- Tecnologías.
- Flujo de datos.

Esta será la primera tarea donde empezaremos a conectar directamente el análisis con la programación que posteriormente haremos en VS Code.
