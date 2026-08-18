# 🎨 Musa

> Tienda virtual de productos personalizados y sublimación.

## 📌 Descripción

Musa es un emprendimiento de sublimación creado por una pareja con el objetivo de ofrecer productos personalizados, creativos y de calidad.

El proyecto comienza como una tienda virtual y busca evolucionar posteriormente hacia una marca con identidad propia y diseños únicos.

## 🎯 Objetivo

Crear una plataforma web que permita a los clientes:

- Explorar productos.
- Buscar y filtrar productos.
- Consultar categorías.
- Personalizar productos.
- Seleccionar diseños disponibles.
- Agregar productos al carrito.
- Crear pedidos sin necesidad de registrarse.
- Registrarse para acceder a funcionalidades adicionales.
- Enviar el pedido a WhatsApp para confirmar la compra.

En una etapa posterior se incorporará una pasarela de pagos.

## 🛍️ Productos

Musa podrá ofrecer productos como:

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

Los productos podrán ser personalizados dependiendo de sus características.

## 👥 Público objetivo

Musa está dirigida principalmente a personas que buscan:

- Regalos personalizados.
- Productos para parejas.
- Regalos para fechas especiales.
- Productos para empresas.
- Productos para eventos.
- Productos para emprendedores.
- Diseños personalizados.

## 👤 Tipos de usuarios

El sistema contempla inicialmente tres tipos de usuarios:

### Visitante

Puede:

- Navegar por la tienda.
- Consultar productos.
- Personalizar productos.
- Agregar productos al carrito.
- Realizar una compra rápida sin registrarse.

### Cliente

Puede:

- Realizar compras.
- Mantener información de su cuenta.
- Consultar sus pedidos.
- Continuar comprando en Musa.

### Administrador

Puede:

- Administrar productos.
- Administrar categorías.
- Administrar pedidos.
- Actualizar estados de pedidos.
- Consultar usuarios.
- Consultar información de ventas.

## 💬 Flujo de compra inicial

Actualmente Musa utilizará el siguiente flujo:

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

Posteriormente:

Pedido
   ↓
Pasarela de pago
   ↓
Confirmación automática.

🚚 Entregas

Inicialmente se contempla:

Domicilios locales en La Ceja.
Envíos mediante transportadora para otros municipios.
Cobertura inicial enfocada en Oriente Antioqueño y posteriormente Antioquia.

La estrategia definitiva de entregas se definirá durante el desarrollo del proyecto.

🎨 Identidad de marca

Musa busca transmitir:

Creatividad.
Arte.
Personalización.
Estilo urbano.
Juventud.
Calidad.
Concepto premium.
Minimalismo.

La identidad visual, logo y colores serán definidos y administrados por el área de diseño de Musa.

🏗️ Arquitectura

El proyecto estará dividido inicialmente en:

Musa
│
├── frontend
│   └── Interfaz de usuario
│
├── backend
│   └── API REST
│
└── Docs
    └── Documentación
🛠️ Tecnologías
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
Herramientas
Git.
GitHub.
Visual Studio Code.
📂 Estructura actual
Musa/
│
├── backend/
├── frontend/
├── Docs/
├── .gitignore
├── README.md
└── CLAUDE.md
📚 Documentación

La documentación del proyecto se encuentra en:

Docs/

Incluye:

Definición del producto.
Requisitos.
Casos de uso.
Arquitectura.
Diseño de base de datos.
Contrato de API REST.
🚀 Estado del proyecto

Actualmente el proyecto se encuentra en fase de preparación y desarrollo inicial.

Completado
 Definición del producto.
 Requisitos funcionales y no funcionales.
 Casos de uso.
 Arquitectura inicial.
 Diseño inicial de base de datos.
 Contrato inicial de API REST.
 Preparación del entorno de desarrollo.
 Configuración de Git y GitHub.
Próximamente
 Crear backend Spring Boot.
 Crear frontend.
 Configurar MySQL.
 Implementar productos.
 Implementar categorías.
 Implementar carrito.
 Implementar pedidos.
 Implementar personalización.
 Implementar autenticación.
 Crear panel administrativo.
 Integrar WhatsApp.