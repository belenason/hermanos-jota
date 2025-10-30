# 🪑 Proyecto Final — Hermanos Jota

## 👥 Integrantes
- Belén Ason
- Leonel Cabrera  
- Tomás Vallejos  
- Mora Arrossi    
- Valentín Baigorria  

---

## 📝 Descripción del Proyecto

**Hermanos Jota** es un e-commerce full stack para una mueblería artesanal, desarrollado con **React + Express + MongoDB**.  
Este proyecto implementa una arquitectura moderna con persistencia real de datos, CRUD completo y navegación dinámica.

---

## ⚙️ Arquitectura General

**Cliente (React)** ⇄ **API REST (Express)** ⇄ **Base de Datos (MongoDB Atlas)**

### 🔹 Backend (`/backend`)
- Conexión a MongoDB Atlas mediante Mongoose.
- Variables de entorno seguras (.env).
- CRUD completo:
  - `GET /api/productos`
  - `GET /api/productos/:id`
  - `POST /api/productos`
  - `PUT /api/productos/:id`
  - `DELETE /api/productos/:id`
- Middlewares:
  - `logger` → registra las solicitudes.
  - `errorHandler` → devuelve errores con status y stack.
- Modelo `Producto` con campos:
  `nombre`, `descripcion`, `precio`, `stock`, `imagenUrl`, y varios opcionales como `medidas`, `materiales`, `garantia`, etc.

### 🔹 Frontend (`/client`)
- React Router DOM para rutas:
  - `/` → Página principal
  - `/productos` → Catálogo dinámico
  - `/productos/:id` → Detalle del producto
  - `/admin/crear-producto` → Crear nuevo producto
  - `/contacto` → Formulario de contacto
- Consumo de la API mediante fetch (archivo `api.js`).
- Formularios controlados y validación HTML5.
- Carrito funcional con `react-use-cart`.
- Componente `Toast` para feedback visual.

---

## 🚀 Deploys

- 🌐 **Frontend (Vercel):** [https://hermanos-jota.vercel.app/](https://hermanos-jota.vercel.app)  
- ⚙️ **Backend (Render):** [https://hermanos-jota.onrender.com/](https://hermanos-jota.onrender.com)

> 🔧 Ambos entornos conectados entre sí usando `REACT_APP_API_URL` en producción.

---

## 🧩 Variables de Entorno

Crea un archivo `.env` en la carpeta `/backend` con:

```env
DB_URI=mongodb+srv://belenason_db_user:belen.proy.mhj@muebleriahjota.ekvzo16.mongodb.net/muebleria-hermanos-jota?appName=MuebleriaHJota
PORT=4000
NODE_ENV=development
```

Y otro en `/client` con:
```env
REACT_APP_API_URL = https://hermanos-jota.onrender.com
```

---

## 🧰 Tecnologías Utilizadas

| Capa | Tecnologías |
|------|--------------|
| **Frontend** | React · React Router DOM · React Use Cart · Bootstrap 5 · CSS3 |
| **Backend** | Node.js · Express.js · Mongoose · dotenv |
| **Base de Datos** | MongoDB Atlas |
| **Herramientas y entorno** | Git & GitHub · Vercel · Render · Visual Studio Code |

---


## ▶️ Ejecución Local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/belenason/hermanos-jota.git
cd hermanos-jota
```

### 2️⃣ Configurar e iniciar el Backend
```bash
cd backend
npm install
# Crear archivo .env (ver arriba)
npm run dev
```

El servidor estará disponible en http://localhost:4000

### 2️⃣ Configurar e iniciar el Frontend
```bash
cd ../client
npm install
npm start
```

La aplicación estará disponible en http://localhost:3000
