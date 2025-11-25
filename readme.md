<section align='center'>
    <h1>Proyecto Final — Mueblería Hermanos Jota</h1>
</section>

<hr>

<div align="center">

![Status](https://img.shields.io/badge/Estado-Terminado-success)
![MERN](https://img.shields.io/badge/Stack-MERN-blue)

</div>

## 👥 Integrantes
- Belén Ason  
- Mora Arrossi  
- Tomás Vallejos  
- Valentín Baigorria
---
<p align="center" style="margin: 15px 0;">
  <a href="#🚀-demo-y-despliegue">Demo y Despliegue</a> •
  <a href="#📝-descripción-del-proyecto">Descripción del Proyecto</a> •
  <a href="#⚙️-arquitectura-general">Arquitectura General</a> •
  <a href="#🔹-backend-backend">Backend</a> •
  <a href="#🔹-frontend-src">Frontend</a> •
  <a href="#🛠-panel-de-administración">Panel de Administración</a> •
  <a href="#🧩-variables-de-entorno">Variables de Entorno</a> •
  <a href="#🛠️-tecnologías-utilizadas">Tecnologías Utilizadas</a> •
  <a href="#▶️-ejecución-local">Ejecución Local</a>
</p>


---

## 🚀 Demo y Despliegue
¡Prueba la aplicación en vivo aquí!

[![unnamed.jpg](https://i.postimg.cc/VN03ysRt/unnamed.jpg)](https://postimg.cc/7CDB0kjP)

<div align="center">

| Componente | URL | Estado |
| :--- | :--- | :--- |
| 🌐 **Frontend (Cliente)** | [**hermanos-jota.vercel.app**](https://hermanos-jota.vercel.app/) | ![Vercel](https://img.shields.io/badge/Vercel-Online-black?logo=vercel) |
| ⚙️ **Backend (API)** | [**hermanos-jota.onrender.com**](https://hermanos-jota.onrender.com/) | ![Render](https://img.shields.io/badge/Render-Online-46E3B7?logo=render) |

</div>

> **Nota:** El backend en Render puede tardar unos segundos en "despertar". <br>

---

## 🔐 Credenciales de Prueba

<div align="center">

| Rol | Email | Contraseña |
| :--- | :--- | :--- |
| 👑 **Administrador** | `admin@gmail.com` | `admin1234` |
| 👤 **Cliente** | `cliente@gmail.com` | `cliente1234` |

</div>

> **Permisos:** Todo nuevo registro se crea como `cliente`. Solo un `admin` existente puede otorgar permisos de administrador a otros usuarios desde el panel.

---

## 📝 Descripción del Proyecto

**Hermanos Jota** digitaliza el proceso de venta de una mueblería tradicional. Desarrollado con el stack **MERN**, el sistema permite la gestión integral del negocio. 

El proyecto implementa:

- Persistencia real de datos en **MongoDB Atlas**.  
- CRUD completo de productos.  
- Sistema de **usuarios con roles** (`cliente` / `admin`).  
- **Autenticación JWT** y protección de rutas en backend y frontend.  
- Gestión de **pedidos** con estados (`pendiente`, `procesando`, `enviado`, `completado`, `cancelado`).  
- Panel de administración con gestión de productos, pedidos y usuarios.

---

## ⚙️ Arquitectura General

**Cliente (React)** ⇄ **API REST (Express)** ⇄ **Base de Datos (MongoDB Atlas)**

---

## 🔹 Backend (`/backend`)

### Tecnologías

- Node.js + Express  
- MongoDB Atlas + Mongoose  
- JWT para autenticación  
- Bcrypt para hash de contraseñas  

### Conexión y servidor

- Conexión a MongoDB mediante `conectarDB()` usando variables en `.env`.  
- CORS configurado para producción.  
- Middlewares globales:
  - `logger` → registra método y URL de cada request.  
  - Manejo centralizado de errores.  

---

### Modelos

#### **Usuario**
- `username` (String, requerido, único)  
- `email` (String, requerido, único)  
- `password` (String, requerido, `select: false`)  
- `roles`: array de strings, `enum: ['cliente', 'admin']`, `default: ['cliente']`  
- Timestamps automáticos

#### **Producto**
- Campos principales:
  - `nombre` (String, requerido)
  - `descripcion` (String, opcional)
  - `precio` (Number, requerido)
  - `stock` (Number, default 0)
  - `imagenes`: **array de strings** con URLs

- Campos adicionales (opcionales):
  - `medidas`, `materiales`, `acabado`, `peso`, `capacidad`, `modulares`,  
    `tapizado`, `confort`, `rotacion`, `garantia`, `cargaMaxima`,  
    `almacenamiento`, `caracteristicas`, `colchon`, `estructura`,  
    `relleno`, `sostenibilidad`, `extension`, `apilables`, `incluye`,  
    `cables`, `regulacion`, `certificacion`.

#### **Pedido**
- `usuario`: ObjectId ref a `Usuario`  
- `items`: array de:
  - `producto` (ref `Producto`)
  - `nombre`
  - `precioUnitario`
  - `cantidad`  
- `total`  
- `estado`: enum con:
  `pendiente`, `procesando`, `enviado`, `completado`, `cancelado`  
- Timestamps automáticos

---

### Rutas y controladores

#### **Productos** (`/api/productos`)
- `GET /api/productos` — Listar productos  
- `GET /api/productos/:id` — Obtener uno  
- `POST /api/productos` — Crear (admin)  
- `PUT /api/productos/:id` — Editar (admin)  
- `DELETE /api/productos/:id` — Eliminar (admin)

Controladores:
- `getProductos`
- `getProducto`
- `createProducto`
- `updateProducto`
- `deleteProducto`

---

#### **Usuarios** (`/api/usuarios`)
- `POST /registro` — Crear usuario
- `POST /login` — Login y generación de JWT
- `GET /perfil` — Ver perfil (requiere token)
- **Admin**:
  - `GET /usuarios` — Listar usuarios
  - `PUT /usuarios/:id` — Cambiar rol

---

#### **Pedidos** (`/api/pedidos`)
- `POST /` — Crear pedido  
- `GET /mios` — Pedidos del usuario  
- `GET /` — Todos los pedidos (admin)  
- `PUT /:id` — Cambiar estado (admin)

---

### Middlewares de seguridad

#### **authMiddleware**
- Lee `Authorization: Bearer <token>`
- Verifica JWT y coloca info del usuario en `req.user`

#### **adminGuard**
- Permite acceso solo si el usuario tiene rol `admin`

---

## 🔹 Frontend (`/src`)

### Tecnologías principales

- React  
- React Router DOM  
- Context API para autenticación y carrito  
- Llamadas a API mediante:
  - `apiUsuarios.js`
  - `apiProductos.js`
  - `apiPedidos.js`

---

### Rutas (React Router)

Definidas en `App.js`:

- `/` → HomePage  
- `/productos` → CatalogPage  
- `/productos/:id` → ProductDetailPage  
- `/contacto` → ContactPage  
- `/carrito` → CartPage  
- `/registro` → RegisterPage  
- `/login` → LoginPage  

#### **Rutas protegidas**

- `/perfil` → perfil del usuario  
- `/mis-pedidos` → mis pedidos  
- `/admin` → panel administrador  
- `/admin/crear-producto` → crear producto  
- `/productos/editar/:id` → editar producto  

Con:
- `ProtectedRoute`
- `AdminRoute`

---

### Autenticación en Frontend

Implementada con **AuthProvider + AuthContext**:

- Guarda `authToken` en localStorage  
- Decodifica el token y guarda el usuario actual  
- Expone:
  - `isAuthenticated`
  - `isAdmin`
  - `login()`
  - `logout()`

## 🛠 Panel de Administración

Incluye:

- Gestión de productos:
  - Crear
  - Editar
  - Eliminar
- Gestión de pedidos:
  - Ver todos los pedidos
  - Cambiar estado
- Gestión de usuarios:
  - Listar usuarios
  - Cambiar roles (evitando que el admin se saque su propio rol)

---

## 🧩 Variables de Entorno

Crea un archivo `.env` en la carpeta `/backend` con:

```env
DB_URI=mongodb+srv://belenason_db_user:belen.proy.mhj@muebleriahjota.ekvzo16.mongodb.net/muebleria-hermanos-jota?appName=MuebleriaHJota
PORT=4000
NODE_ENV=development
JWT_SECRET=7f4a8e2b5c9d1f3a6b8c0e2d4f6a8b1c3d5e7f9a2b4c6d8e0f2a4b6c8d1e3f5a7b9c1d3e5f7a9b2c4d6e8f0a2b4c6d8e1f3
```

---

## 🛠️ Tecnologías Utilizadas

<div align="center">

| Tecnologías                                                                                                       | Descripción                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)               | Biblioteca de JavaScript para crear interfaces de usuario interactivas y dinámicas.                          |
| ![CRA](https://img.shields.io/badge/Create%20React%20App-09D3AC?style=for-the-badge&logo=create-react-app&logoColor=white) | Entorno de configuración inicial para arrancar aplicaciones de React Single Page.                            |
| ![Css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)                   | Lenguaje de estilos en cascada que controla la presentación visual del DOM.                                  |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)        | Entorno de ejecución que permite usar JavaScript en el servidor.                                             |
| ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)     | Framework minimalista para Node.js que facilita la creación de APIs y servidores web.                        |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)            | Plataforma para desplegar aplicaciones web modernas con soporte para frontend.                     |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)             | Plataforma de nube unificada utilizada para alojar y desplegar servicios web.               |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)          | Base de datos NoSQL orientada a documentos, utilizada para almacenar la información.                         |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)      | Sistema de autenticación basado en tokens para proteger rutas y gestionar sesiones de usuario.               |

</div>

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

<div align="center">
<br/> Agradecimientos a nuestro profesor Flavio Espeche Nieva. <br/>
<div/>
