# 🚀 Proyecto Hermanos Jota

## 👥 Participantes

- ⭐ Leonel Cabrera
- ⭐ Tomás Vallejos
- ⭐ Mora Arrossi
- ⭐ Belén Ason
- ⭐ Valentín Baigorria

## 📝 Descripción

Hermanos Jota es un e-commerce de muebles artesanales desarrollado con una arquitectura moderna Full Stack JavaScript. El sitio busca ofrecer una experiencia fluida y visualmente atractiva, combinando la estética artesanal de los productos con herramientas tecnológicas actuales.

El proyecto incluye:

- 🏠 **Página principal** con navegación intuitiva y productos destacados
- 🛋️ **Catálogo dinámico** conectado a una API propia con búsqueda y filtrado
- 🛒 **Carrito de compras** funcional con actualización en tiempo real y persistencia local
- 📄 **Vistas detalladas** de productos con descripciones e imágenes
- 💬 **Formulario de contacto** completamente funcional
- 📱 **Diseño responsive** adaptable a móviles, tablets y escritorio

## 🏗️ Arquitectura del Proyecto

El proyecto se divide en dos grandes capas:

### 🔹 Backend (`/backend`)

Construido con Node.js y Express, se encarga de:

- **Servir los datos** de los productos mediante endpoints REST (`/api/productos`)
- **Implementar middlewares** de logging y manejo de errores (404 y 500)
- **Utilizar datos locales** en formato JSON, simulando una base de datos
- **Mantener una estructura** modular con carpetas separadas por responsabilidad:
  - `controllers/` → Lógica de negocio
  - `routes/` → Rutas y endpoints
  - `middlewares/` → Registro y manejo de errores
  - `data/` → Fuente de datos local (productos)

### 🔹 Frontend (`/client`)

Desarrollado con React, HTML, CSS y Bootstrap, gestiona la interfaz y la interacción del usuario:

- Consume los datos del backend mediante fetch API desde `productosService.js`
- Usa `useState` y `useEffect` para manejar el ciclo de vida de las peticiones
- Implementa componentes modulares como `ProductCard`, `Cart`, y `ContactForm`
- Controla el estado global del carrito en `App.js`
- Muestra estados de carga ("Cargando...") y error de forma visual
- Implementa enrutamiento dinámico entre catálogo, detalle y contacto

## ⚙️ Decisiones Técnicas

Durante el desarrollo se tomaron decisiones claves para mantener una estructura clara, escalable y coherente:

- **Separación del backend y frontend**: permite trabajar de forma paralela y facilitar la implementación de APIs RESTful
- **Uso de React**: elegido por su capacidad de reutilización de componentes y manejo eficiente del estado
- **Express.js en el backend**: por su sencillez, flexibilidad y compatibilidad con Node.js
- **Persistencia local con JSON**: ideal para desarrollo sin necesidad de una base de datos completa
- **Arquitectura modular**: se priorizó la organización del código en capas bien definidas (controladores, rutas, datos)
- **Bootstrap + CSS personalizado**: permite combinar diseño profesional con ajustes visuales propios de la marca
- **Control de versiones con Git y GitHub**: asegurando commits individuales y colaborativos de todos los integrantes

## 🧰 Tecnologías Utilizadas

### 🖥️ Frontend
- React
- Bootstrap 5
- CSS3
- HTML5

### ⚙️ Backend
- Node.js
- Express

### 🧩 Herramientas y entorno
- Git & GitHub
- Visual Studio Code
- dotenv
- Nodemon (para desarrollo)

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v14 o superior)
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/belenason/hermanos-jota.git
cd hermanos-jota
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Iniciar el servidor backend
```bash
# Desde la carpeta backend
npm run dev
```
El servidor estará corriendo en `http://localhost:4000`

### 4. Instalar dependencias del frontend
```bash
# Abrir una nueva terminal
cd client
npm install
```

### 5. Iniciar el servidor frontend
```bash
# Desde la carpeta client
npm start
```
La aplicación estará disponible en `http://localhost:3000`
