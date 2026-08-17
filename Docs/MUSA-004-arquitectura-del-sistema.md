# MUSA — Arquitectura del Sistema

**Documento:** MUSA-004  
**Estado:** Completada  
**Versión:** 1.0  
**Fecha:** 2026-08-16  
**Relacionado con:** MUSA-001, MUSA-002 y MUSA-003

---

# 1. Objetivo

Definir la arquitectura técnica de Musa antes de comenzar la implementación.

La arquitectura debe:

- Ser comprensible para el aprendizaje del desarrollador.
- Permitir desarrollar el MVP sin complejidad innecesaria.
- Separar responsabilidades.
- Permitir crecimiento futuro.
- Facilitar mantenimiento y pruebas.
- Mantener una estructura profesional.
- Permitir que el frontend y backend evolucionen de forma independiente.

---

# 2. Decisión arquitectónica principal

Musa utilizará una arquitectura de **aplicación web cliente-servidor**, formada inicialmente por:

```text
┌──────────────────────────────┐
│           CLIENTE            │
│                              │
│ HTML + CSS + JavaScript      │
│ Frontend                     │
└──────────────┬───────────────┘
               │
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│                              │
│ Java + Spring Boot           │
│ API REST                     │
└──────────────┬───────────────┘
               │
               │ JPA / Hibernate
               ▼
┌──────────────────────────────┐
│          DATABASE            │
│                              │
│ MySQL                       │
└──────────────────────────────┘
```

El backend será el responsable de las reglas de negocio y del acceso a los datos.

El frontend será responsable de la interfaz y de la interacción con el usuario.

---

# 3. Estilo de arquitectura

## 3.1 Monolito modular

El backend será inicialmente un **monolito modular**.

Esto significa que tendremos una sola aplicación Spring Boot, pero organizada internamente por responsabilidades.

```text
Musa Backend
│
├── Usuarios
├── Productos
├── Categorías
├── Carrito
├── Pedidos
└── Administración
```

No utilizaremos microservicios en el MVP.

### ¿Por qué?

Porque Musa está comenzando y los microservicios añadirían complejidad innecesaria:

- Más aplicaciones.
- Más despliegues.
- Más comunicación entre servicios.
- Más configuración.
- Más puntos de fallo.

El monolito modular permitirá aprender arquitectura sin introducir infraestructura que todavía no necesitamos.

---

# 4. Frontend

## Tecnología inicial

- HTML
- CSS
- JavaScript
- Vite como herramienta de desarrollo/build, si se confirma durante la inicialización.

No utilizaremos React en el MVP.

### Motivo

El objetivo del proyecto también es que el desarrollador comprenda directamente:

- DOM.
- Eventos.
- Fetch.
- HTTP.
- JSON.
- Estado del carrito.
- Manipulación de la interfaz.
- Comunicación con APIs.

Posteriormente Musa podrá migrar o incorporar un framework si existe una razón real para hacerlo.

---

# 5. Responsabilidades del frontend

El frontend será responsable de:

- Mostrar la interfaz.
- Aplicar la identidad visual de Musa.
- Mostrar productos.
- Mostrar categorías.
- Buscar y filtrar.
- Gestionar interacción del carrito.
- Recoger información de personalización.
- Validar datos básicos antes de enviarlos.
- Comunicarse con el backend.
- Mostrar respuestas y errores.
- Gestionar la experiencia de usuario.

El frontend **no deberá contener reglas críticas de negocio**.

Por ejemplo:

El frontend puede validar que la cantidad sea mayor que cero, pero el backend deberá volver a validarlo.

---

# 6. Backend

## Tecnología

- Java.
- Spring Boot.
- Spring Web.
- Spring Data JPA.
- Spring Security cuando llegue la etapa de autenticación.
- MySQL.
- Maven.

La documentación oficial actual de Spring Boot muestra Spring Boot 4.1.0 como versión estable y Spring Boot 4.1 requiere al menos Java 17. La versión exacta del proyecto se decidirá durante la creación del backend, verificando compatibilidad de las dependencias. citeturn0search2turn0search5

Spring Data JPA proporciona una abstracción de repositorios para el acceso a datos mediante JPA, lo que encaja con la arquitectura prevista para Musa. citeturn0search6turn0search9

---

# 7. Responsabilidades del backend

El backend será responsable de:

- Exponer la API REST.
- Validar información.
- Ejecutar reglas de negocio.
- Gestionar usuarios.
- Gestionar autenticación y autorización.
- Gestionar productos.
- Gestionar categorías.
- Gestionar pedidos.
- Calcular información relacionada con pedidos.
- Persistir información.
- Manejar errores.
- Proteger operaciones administrativas.

---

# 8. Capas del backend

Utilizaremos inicialmente una arquitectura por capas.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Con modelos y DTOs atravesando las capas cuando corresponda.

---

## 8.1 Controller

Recibe las peticiones HTTP.

Ejemplo conceptual:

```text
GET /api/productos
POST /api/productos
GET /api/productos/{id}
PUT /api/productos/{id}
DELETE /api/productos/{id}
```

El Controller no deberá contener toda la lógica de negocio.

Su función principal será:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Response
```

---

## 8.2 Service

Contendrá la lógica de negocio.

Ejemplo:

```text
ProductoService

crearProducto()
actualizarProducto()
buscarProducto()
eliminarProducto()
```

Si mañana la regla dice:

> "No permitir eliminar un producto que tenga pedidos históricos"

esa regla pertenece al dominio/servicio, no al Controller.

---

## 8.3 Repository

Será responsable del acceso a datos.

Ejemplo conceptual:

```text
ProductoRepository
CategoríaRepository
UsuarioRepository
PedidoRepository
```

Spring Data JPA proporciona la abstracción de repositorios para reducir código repetitivo en el acceso a datos. citeturn0search6turn0search9

---

## 8.4 Entity

Representará las estructuras persistidas en la base de datos.

Ejemplos futuros:

```text
Producto
Categoria
Usuario
Pedido
PedidoItem
```

No todas las entidades tendrán que exponerse directamente al frontend.

---

## 8.5 DTO

Los DTO (Data Transfer Object) representarán los datos que entran o salen de la API.

Ejemplo conceptual:

```text
ProductoResponse
ProductoRequest
UsuarioResponse
PedidoResponse
```

Esto permitirá evitar que el frontend dependa directamente de la estructura interna de las entidades.

---

# 9. Flujo de una petición

Ejemplo:

El usuario quiere ver los productos.

```text
Frontend
   │
   │ GET /api/productos
   ▼
Controller
   │
   ▼
ProductoService
   │
   ▼
ProductoRepository
   │
   ▼
MySQL
   │
   ▼
ProductoRepository
   │
   ▼
ProductoService
   │
   ▼
Controller
   │
   │ JSON
   ▼
Frontend
```

Este flujo será uno de los conceptos más importantes que el desarrollador aprenderá durante Musa.

---

# 10. API REST

El backend expondrá recursos mediante endpoints REST.

## Productos

```text
GET    /api/productos
GET    /api/productos/{id}
POST   /api/productos
PUT    /api/productos/{id}
DELETE /api/productos/{id}
```

## Categorías

```text
GET    /api/categorias
GET    /api/categorias/{id}
POST   /api/categorias
PUT    /api/categorias/{id}
DELETE /api/categorias/{id}
```

## Usuarios

Los endpoints exactos se definirán durante la implementación de autenticación.

## Pedidos

```text
GET    /api/pedidos
GET    /api/pedidos/{id}
POST   /api/pedidos
PUT    /api/pedidos/{id}/estado
```

Los endpoints definitivos podrán cambiar durante el diseño de la API.

---

# 11. Base de datos

Musa utilizará inicialmente:

**MySQL**

La base de datos almacenará información persistente como:

- Usuarios.
- Roles.
- Productos.
- Categorías.
- Imágenes/referencias de imágenes.
- Pedidos.
- Elementos del pedido.
- Personalizaciones.
- Estados.

No se diseñará todavía el esquema definitivo. Eso corresponderá a MUSA-005.

---

# 12. Imágenes y archivos

Esta decisión requiere especial atención.

Musa tendrá dos tipos principales de imágenes:

### Imágenes de productos

Ejemplo:

```text
mug.jpg
termo.jpg
camiseta.jpg
```

### Imágenes enviadas por clientes

Ejemplo:

```text
foto-personalizacion.jpg
```

No almacenaremos inicialmente grandes archivos binarios directamente dentro de las tablas de productos o pedidos.

La estrategia de almacenamiento será definida en una tarea específica.

### Desarrollo local

Podremos utilizar almacenamiento local durante el desarrollo.

### Producción

Se evaluará almacenamiento de objetos/servicio externo.

Esto evita diseñar la base de datos alrededor de archivos pesados.

---

# 13. Carrito

El carrito tendrá una particularidad.

Un visitante puede comprar sin registrarse.

Por eso el carrito inicialmente tendrá una parte gestionada por el frontend.

Conceptualmente:

```text
Visitante
   ↓
Frontend
   ↓
Carrito local
   ↓
Confirmación
   ↓
Backend
   ↓
Pedido
```

Para usuarios registrados se podrá evolucionar posteriormente hacia un carrito persistente asociado a la cuenta.

---

# 14. WhatsApp

WhatsApp será inicialmente un punto de salida del flujo de compra.

```text
Musa
  ↓
Crear pedido
  ↓
Generar información
  ↓
Preparar mensaje
  ↓
WhatsApp
```

El backend deberá generar o entregar la información necesaria para construir el mensaje.

No implementaremos inicialmente una integración completa con WhatsApp Business API.

---

# 15. Autenticación y autorización

Habrá dos roles persistentes:

```text
CLIENTE
ADMIN
```

El visitante será un usuario no autenticado.

Conceptualmente:

```text
                    MUSA
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
       CLIENTE                ADMIN
          │                     │
          ▼                     ▼
   Funciones cliente     Funciones administrativas
```

La autenticación se implementará posteriormente utilizando Spring Security.

La tecnología exacta de tokens/sesiones será definida en la etapa de seguridad.

---

# 16. Seguridad

La seguridad estará principalmente en el backend.

Ejemplo:

```text
GET /api/productos
→ Público

GET /api/categorias
→ Público

POST /api/pedidos
→ Público/cliente según flujo

POST /api/productos
→ ADMIN

PUT /api/productos/{id}
→ ADMIN

DELETE /api/productos/{id}
→ ADMIN
```

El frontend puede ocultar botones administrativos, pero eso **no es seguridad**.

La verdadera protección deberá estar en el backend.

---

# 17. Manejo de errores

El backend deberá tener una estrategia centralizada para errores.

Ejemplo conceptual:

```text
Request
   ↓
Controller
   ↓
Service
   ↓
Error
   ↓
Manejador global
   ↓
Respuesta HTTP consistente
```

Ejemplo de respuesta futura:

```json
{
  "status": 404,
  "message": "Producto no encontrado",
  "timestamp": "..."
}
```

La estructura definitiva se definirá durante la implementación.

---

# 18. Estructura general del proyecto

La propuesta inicial será:

```text
MUSA/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── ...
│
├── docs/
│   ├── MUSA-001-definicion-producto.md
│   ├── MUSA-002-requisitos-funcionales-y-no-funcionales.md
│   ├── MUSA-003-casos-de-uso-y-flujos.md
│   └── MUSA-004-arquitectura.md
│
├── README.md
├── CLAUDE.md
└── .gitignore
```

---

# 19. Estructura propuesta del backend

Cuando empecemos a programar:

```text
backend/
└── src/
    └── main/
        └── java/
            └── com/
                └── musa/
                    └── api/
                        ├── controller/
                        ├── service/
                        ├── repository/
                        ├── entity/
                        ├── dto/
                        ├── mapper/
                        ├── exception/
                        ├── security/
                        └── config/
```

### Responsabilidad

```text
controller/
→ HTTP

service/
→ reglas de negocio

repository/
→ base de datos

entity/
→ modelo persistente

dto/
→ datos de entrada/salida

mapper/
→ conversión Entity ↔ DTO

exception/
→ errores

security/
→ autenticación/autorización

config/
→ configuración
```

No crearemos todas estas carpetas de una vez. Se irán incorporando cuando sean necesarias.

---

# 20. Estructura propuesta del frontend

```text
frontend/
└── src/
    ├── assets/
    │   ├── images/
    │   └── icons/
    │
    ├── css/
    │   ├── main.css
    │   ├── components/
    │   └── pages/
    │
    ├── js/
    │   ├── main.js
    │   ├── state/
    │   └── utils/
    │
    ├── components/
    │   ├── navbar/
    │   ├── footer/
    │   ├── product-card/
    │   └── ...
    │
    ├── pages/
    │   ├── home/
    │   ├── products/
    │   ├── product-detail/
    │   ├── cart/
    │   ├── login/
    │   └── account/
    │
    └── services/
        ├── api.js
        ├── product-service.js
        ├── category-service.js
        └── order-service.js
```

La estructura exacta se ajustará cuando construyamos el frontend.

---

# 21. Entornos

Musa tendrá al menos dos entornos conceptuales:

## Desarrollo

```text
Frontend → localhost
Backend  → localhost
MySQL    → local
```

## Producción

```text
Internet
   ↓
Frontend desplegado
   ↓
Backend desplegado
   ↓
Base de datos de producción
```

No se configurará producción todavía.

---

# 22. Git y GitHub

Utilizaremos Git desde el comienzo.

Flujo inicial:

```text
Cambio
  ↓
git status
  ↓
git add
  ↓
git commit
  ↓
git push
  ↓
GitHub
```

Más adelante aprenderemos ramas y Pull Requests cuando tenga sentido.

---

# 23. Comunicación entre ChatGPT, Claude y el proyecto

El proyecto tendrá un archivo:

```text
CLAUDE.md
```

Este archivo contendrá:

- Descripción de Musa.
- Stack.
- Arquitectura.
- Convenciones.
- Reglas.
- Estructura.
- Estado actual.
- Tarea actual.
- Decisiones importantes.

ChatGPT y Claude tendrán roles distintos:

### ChatGPT

```text
Arquitectura
Planificación
Mentoría
Revisión
Decisiones
Debugging
```

### Claude

```text
Implementación
Refactorización
Análisis
Código
```

### Usuario

```text
Decisiones
Programación
Pruebas
Aprendizaje
```

---

# 24. Principios de desarrollo

Musa seguirá estas reglas:

## Principio 1 — Simplicidad

No agregar tecnología sin una razón.

## Principio 2 — Separación de responsabilidades

Cada capa tendrá una función clara.

## Principio 3 — Seguridad desde el principio

Las funciones administrativas siempre estarán protegidas en backend.

## Principio 4 — Código comprensible

Se priorizará código que puedas leer y entender.

## Principio 5 — No copiar sin comprender

Claude podrá generar código, pero el usuario deberá entender las piezas importantes antes de incorporarlas.

## Principio 6 — Cambios pequeños

Trabajaremos por tareas pequeñas y verificables.

## Principio 7 — Documentación

Las decisiones importantes se documentarán.

## Principio 8 — Evolución

La arquitectura debe permitir que Musa pase de tienda a marca.

---

# 25. Arquitectura resumida

```text
                           MUSA
                            │
              ┌─────────────┴─────────────┐
              │                           │
         FRONTEND                    BACKEND API
      HTML/CSS/JS                  Java/Spring Boot
              │                           │
              │ HTTP/JSON                 │
              └─────────────┬─────────────┘
                            │
                       SERVICE LAYER
                            │
                       REPOSITORIES
                            │
                            ▼
                          MySQL

        ┌────────────────────────────────────┐
        │ Servicios externos / futuros       │
        │                                    │
        │ WhatsApp                           │
        │ Almacenamiento de imágenes         │
        │ Pasarela de pagos                  │
        │ Transportadoras                    │
        └────────────────────────────────────┘
```

---

# 26. Decisiones tomadas

| Decisión | Estado |
|---|---|
| Arquitectura cliente-servidor | ✅ |
| Backend REST | ✅ |
| Java | ✅ |
| Spring Boot | ✅ |
| MySQL | ✅ |
| Spring Data JPA | ✅ |
| Maven | ✅ |
| Frontend HTML/CSS/JS | ✅ |
| React en MVP | ❌ |
| Monolito modular | ✅ |
| Microservicios | ❌ |
| Arquitectura por capas | ✅ |
| DTOs | ✅ |
| Spring Security | ✅ Futuro inmediato |
| Git/GitHub | ✅ |
| Docker | 🔵 Futuro |
| Pasarela de pagos | 🔵 Futuro |
| WhatsApp API | 🔵 Futuro |

---

# 27. Decisiones pendientes

Todavía no diseñaremos:

- Modelo entidad-relación definitivo.
- Tablas MySQL.
- Relaciones.
- Campos exactos.
- Estrategia de autenticación.
- Almacenamiento definitivo de imágenes.
- Contrato completo de la API.
- Diseño visual final.
- Deployment.

Estas decisiones tendrán sus propias tareas.

---

# 28. Estado de la tarea

**MUSA-004 — Arquitectura del sistema: COMPLETADA ✅**

### Próxima tarea

**MUSA-005 — Diseño de la base de datos**

En esta etapa se diseñarán:

- Entidades.
- Atributos.
- Relaciones.
- Claves primarias.
- Claves foráneas.
- Cardinalidades.
- Estados.
- Normalización inicial.
- Diagrama entidad-relación.

El resultado será la base para posteriormente crear la base de datos MySQL y las entidades JPA del backend.
