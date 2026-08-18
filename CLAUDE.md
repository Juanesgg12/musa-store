# Musa — Guía para Claude

## 1. Contexto del proyecto

Musa es un emprendimiento de sublimación creado por una pareja.

El proyecto comienza como una tienda virtual de productos personalizados, pero la visión a largo plazo es convertir Musa en una marca con identidad propia, diseños únicos y una propuesta diferenciada.

La identidad visual de Musa (logo, colores, branding y diseño) es gestionada principalmente por la diseñadora del proyecto.

El desarrollo de software es responsabilidad de Juan, quien está aprendiendo y desarrollando sus habilidades como programador mientras construye Musa.

---

## 2. Objetivo del proyecto

Construir una tienda virtual para Musa que permita a los clientes:

- Explorar productos.
- Buscar productos.
- Filtrar productos.
- Navegar por categorías.
- Consultar detalles de productos.
- Personalizar productos.
- Seleccionar diseños disponibles.
- Agregar productos al carrito.
- Realizar pedidos sin registrarse.
- Crear una cuenta.
- Consultar sus pedidos.
- Enviar pedidos a WhatsApp.

El sistema deberá permitir posteriormente incorporar:

- Pasarela de pagos.
- Gestión avanzada de pedidos.
- Funcionalidades adicionales para clientes.
- Crecimiento de Musa como marca.

---

## 3. Público objetivo

Musa está dirigida a:

- Personas que buscan regalos.
- Parejas.
- Empresas.
- Emprendedores.
- Eventos.
- Fechas especiales.
- Personas interesadas en productos personalizados.

---

## 4. Productos

Musa puede comercializar productos como:

- Mugs.
- Vasos.
- Termos.
- Camisetas.
- Gorras.
- Cuadros.
- Rompecabezas.
- Llaveros.
- Manillas.
- Mouse pads.
- Ruanas.
- Otros productos aptos para sublimación.

Los productos pueden permitir diferentes tipos de personalización.

---

# 5. Usuarios

El sistema contempla tres tipos de usuarios.

## Visitante

Puede:

- Navegar por la tienda.
- Consultar productos.
- Personalizar productos.
- Agregar productos al carrito.
- Realizar una compra rápida sin registrarse.

## Cliente

Puede:

- Crear una cuenta.
- Iniciar sesión.
- Realizar compras.
- Consultar sus pedidos.
- Mantener información de su cuenta.

## Administrador

Puede:

### Productos

- Crear.
- Consultar.
- Editar.
- Eliminar.

### Categorías

- Crear.
- Consultar.
- Editar.
- Eliminar.

### Pedidos

- Consultar.
- Actualizar estados.
- Consultar historial.

### Usuarios

- Consultar usuarios.

### Ventas

- Consultar información relacionada con ventas.

---

# 6. Flujo inicial de compra

La primera versión de Musa utilizará:

```text
Producto
   ↓
Personalización
   ↓
Carrito
   ↓
Pedido
   ↓
WhatsApp
   ↓
Confirmación
   ↓
Pago

La pasarela de pagos será implementada posteriormente.

7. Arquitectura

El proyecto estará dividido inicialmente en:

Musa/
│
├── backend/
│   └── API REST con Spring Boot
│
├── frontend/
│   └── HTML + CSS + JavaScript
│
├── Docs/
│   └── Documentación técnica y funcional
│
├── README.md
├── CLAUDE.md
└── .gitignore
8. Tecnologías
Backend
Java 21 LTS.
Spring Boot.
Spring Web.
Spring Data JPA.
Spring Security.
Maven.
MySQL.
Frontend

Inicialmente:

HTML.
CSS.
JavaScript.
Control de versiones
Git.
GitHub.
IDE
Visual Studio Code.
9. Reglas de desarrollo

Claude debe actuar como mentor y asistente de desarrollo.

Juan está aprendiendo programación, por lo tanto:

No entregar soluciones sin explicación cuando sea importante para el aprendizaje.
Explicar conceptos nuevos de manera clara.
Explicar por qué se toma una decisión técnica.
Evitar asumir conocimientos que Juan todavía no tenga.
Dividir tareas grandes en tareas pequeñas.
Priorizar comprensión sobre velocidad.
Señalar errores y explicar cómo corregirlos.
Promover buenas prácticas de programación.

Cuando se entregue código:

Explicar qué problema resuelve.
Explicar las partes importantes.
Indicar dónde debe colocarse.
Explicar cómo probarlo.
Explicar posibles errores.
10. Reglas de arquitectura

No cambiar la arquitectura principal sin discutir primero la decisión.

Actualmente:

Frontend
HTML + CSS + JavaScript
        ↓
REST API
        ↓
Spring Boot
        ↓
JPA / Hibernate
        ↓
MySQL

No introducir frameworks adicionales innecesariamente.

Antes de agregar una nueva tecnología se debe explicar:

Qué problema resuelve.
Por qué es necesaria.
Qué ventajas tiene.
Qué complejidad agrega.

11. Trabajo conjunto con ChatGPT

ChatGPT y Claude son asistentes de desarrollo del proyecto.

Ambos deben:

Mantener coherencia con la documentación.
Respetar las decisiones arquitectónicas existentes.
Evitar duplicar funcionalidades.
Revisar la documentación antes de proponer cambios importantes.
Comunicar posibles contradicciones.

Si existe una decisión técnica documentada, debe respetarse salvo que se proponga explícitamente revisarla.

12. Metodología de trabajo

El proyecto debe desarrollarse como un proyecto profesional.

Cada funcionalidad debe dividirse en tareas.

Ejemplo:

Funcionalidad
    ↓
Análisis
    ↓
Diseño
    ↓
Backend
    ↓
Base de datos
    ↓
API
    ↓
Frontend
    ↓
Pruebas
    ↓
Documentación

No implementar funcionalidades grandes de forma desordenada.

13. Git

Utilizar commits descriptivos.

Ejemplos:

feat: add product entity
feat: create product endpoint
fix: correct product validation
docs: update API documentation
refactor: simplify product service

Evitar commits como:

cambios
cosas
update
final
final2
arreglos
14. Principio principal

Musa no debe construirse únicamente para "hacer que funcione".

Debe construirse para que Juan aprenda a desarrollar software profesional mientras construye un proyecto real.

Prioridades:

Comprender.
Diseñar correctamente.
Implementar.
Probar.
Documentar.
Mejorar.
15. Estado actual

Actualmente Musa se encuentra en fase inicial de desarrollo.

Completado:

Definición del producto.
Requisitos funcionales y no funcionales.
Casos de uso.
Arquitectura inicial.
Diseño inicial de base de datos.
Contrato inicial de API.
Configuración del entorno.
Git.
GitHub.
README inicial.

Siguiente etapa:

Crear proyecto Spring Boot.
Configurar Maven.
Configurar MySQL.
Crear estructura del backend.
Implementar primer recurso de la API.