# 📋 Plan de Implementación - Sprint 3 y 4
## Mueblería Hermanos Jota - E-commerce

---

## 🎯 Objetivo General
Transformar el sitio web estático en una aplicación cliente-servidor completa:
- **Frontend**: React (SPA)
- **Backend**: Node.js + Express (API REST)

---

## 📊 Estado Actual del Proyecto

### ✅ **FASE 1: Estructura Básica del Backend** (COMPLETADA)
**Tareas completadas:**
- ✅ Servidor Express configurado
- ✅ Estructura de carpetas `/backend` creada
- ✅ Middleware de logging implementado
- ✅ Rutas modulares con `express.Router`
- ✅ Endpoints básicos: `GET /api/productos` y `GET /api/productos/:id`

### ✅ **FASE 2: Configuración del Frontend React** (COMPLETADA)
**Tareas completadas:**
- ✅ Proyecto React creado con `create-react-app`
- ✅ Estructura de carpetas `/client` creada
- ✅ Carpetas de organización: `components/`, `pages/`, `services/`, etc.

---

## 🚀 Fases Pendientes

### ✅ **FASE 3: Migración de Datos y Controladores del Backend** (COMPLETADA)
**Objetivo:** Completar la lógica del backend para servir datos de productos.

**Tareas:**
1. ✅ Crear archivo de datos `productos.data.js` con el array de productos del sitio original
2. ✅ Implementar controladores en `productos.controller.js`
3. ✅ Implementar manejo de errores 404 para productos no encontrados
4. ✅ Verificar que el middleware de logging funcione correctamente
5. ✅ Agregar manejador de rutas no encontradas (404 global)
6. ✅ Agregar manejador de errores centralizado

**Entregables:**
- ✅ Backend funcional que responda correctamente a peticiones GET
- ✅ Manejo de errores robusto

---

### ✅ **FASE 4: Componentes Base de React** (COMPLETADA)
**Objetivo:** Crear la estructura de componentes reutilizables del frontend.

**Tareas:**
1. ✅ Crear componente `<Header />` con navbar
2. ✅ Crear componente `<Footer />` con redes sociales
3. ✅ Crear componente `<ProductCard />` para mostrar un producto
4. ✅ Crear componente `<ProductList />` para el catálogo
5. ✅ Crear componente `<ProductDetail />` para vista individual
6. ✅ Crear componente `<CartIcon />` con contador de items
7. ✅ Crear componente `<ContactForm />` controlado
8. ✅ Crear servicio `productosService.js` para peticiones HTTP
9. ✅ Crear archivos CSS para todos los componentes
10. ✅ Integrar componentes en `App.js` con estado y navegación

**Entregables:**
- ✅ Componentes básicos listos para integración
- ✅ Estructura de carpetas organizada
- ✅ Estilos CSS implementados
- ✅ Lógica de estado y navegación implementada

---

### 🚧 **FASE 5: Integración API - Catálogo de Productos**
**Objetivo:** Conectar React con el backend para mostrar productos dinámicamente.

**Tareas:**
1. Crear servicio `productosService.js` con funciones fetch
2. Implementar `useEffect` en componente principal para cargar productos
3. Implementar estados de carga: "Cargando...", "Error", "Éxito"
4. Renderizar lista de productos con `.map()` y `keys` correctas
5. Pasar datos a `<ProductCard />` mediante props
6. Implementar manejo de errores en las peticiones

**Conceptos clave:**
- `useState` para manejar estado de productos
- `useEffect` para peticiones al montar el componente
- Ciclo de vida de peticiones HTTP

**Entregables:**
- Catálogo funcional que carga datos desde la API

---

### 🚧 **FASE 6: Vista de Detalle con Renderizado Condicional**
**Objetivo:** Mostrar detalles de un producto sin usar React Router.

**Tareas:**
1. Crear estado en `App.js` para producto seleccionado: `selectedProduct`
2. Implementar función `handleProductClick` para cambiar el estado
3. Pasar función a `<ProductCard />` como prop
4. Implementar renderizado condicional en `App.js`:
   - Si `selectedProduct === null` → mostrar `<ProductList />`
   - Si `selectedProduct !== null` → mostrar `<ProductDetail />`
5. Agregar botón "Volver al catálogo" en `<ProductDetail />`
6. Hacer fetch de detalles del producto: `GET /api/productos/:id`

**Conceptos clave:**
- Renderizado condicional con operador ternario
- Lifting state up (elevar el estado)
- Pasar funciones como props

**Entregables:**
- Navegación funcional entre catálogo y detalle de producto

---

### 🚧 **FASE 7: Carrito de Compras con Estado Global**
**Objetivo:** Implementar funcionalidad de carrito usando `useState`.

**Tareas:**
1. Crear estado en `App.js`: `const [cart, setCart] = useState([])`
2. Crear función `addToCart(producto)` en `App.js`
3. Pasar `addToCart` como prop a `<ProductCard />` y `<ProductDetail />`
4. Implementar botón "Añadir al Carrito" en ambos componentes
5. Actualizar `<CartIcon />` para mostrar cantidad de items: `cart.length`
6. Pasar `cart` como prop a `<CartIcon />`
7. (Opcional) Implementar lógica para evitar duplicados o incrementar cantidad

**Conceptos clave:**
- Estado compartido entre componentes
- Inmutabilidad en React (spread operator)
- Props drilling

**Entregables:**
- Carrito funcional con contador actualizado en tiempo real

---

### 🚧 **FASE 8: Formulario de Contacto Controlado**
**Objetivo:** Crear formulario con inputs controlados por estado.

**Tareas:**
1. Crear estados para cada campo del formulario:
   ```javascript
   const [nombre, setNombre] = useState('');
   const [email, setEmail] = useState('');
   const [mensaje, setMensaje] = useState('');
   ```
2. Vincular cada input con su estado usando `value` y `onChange`
3. Implementar función `handleSubmit` que:
   - Previene el comportamiento por defecto (`e.preventDefault()`)
   - Hace `console.log` del objeto con los datos
   - Muestra mensaje de éxito en la UI
4. Limpiar el formulario después del envío
5. (Opcional) Agregar validaciones básicas

**Conceptos clave:**
- Componentes controlados
- Manejo de eventos en React
- Prevención de comportamiento por defecto

**Entregables:**
- Formulario de contacto funcional y controlado

---

### 🚧 **FASE 9: Estilos y Responsividad**
**Objetivo:** Aplicar estilos CSS/Bootstrap para que la app se vea profesional.

**Tareas:**
1. Migrar estilos del sitio original a componentes React
2. Usar CSS Modules o styled-components (opcional)
3. Integrar Bootstrap en React (react-bootstrap)
4. Asegurar que todos los componentes sean responsive
5. Aplicar manual de marca de Hermanos Jota

**Entregables:**
- Interfaz visualmente atractiva y responsive

---

### 🚧 **FASE 10: Testing y Documentación Final**
**Objetivo:** Asegurar calidad y documentar el proyecto.

**Tareas:**
1. Probar todos los endpoints del backend con Postman/Thunder Client
2. Probar flujos completos en el frontend
3. Actualizar README.md con:
   - Instrucciones de instalación para `/backend` y `/client`
   - Comandos para iniciar ambos servidores
   - Descripción de la arquitectura
   - Decisiones técnicas tomadas
4. Asegurar que todos los integrantes tengan commits en el repositorio
5. Verificar que `.gitignore` excluya `node_modules/`

**Entregables:**
- Proyecto completo, probado y documentado
- README.md profesional

---

## 📝 Requisitos Técnicos Detallados

### Backend (Node.js + Express)

#### Estructura de Carpetas
```
/backend
  /src
    /controllers
      productos.controller.js
    /data
      productos.data.js
    /middlewares
      logger.middleware.js
      errorHandler.middleware.js
    /routes
      productos.routes.js
    app.js
  server.js
  package.json
  .env
```

#### Endpoints Requeridos
1. **GET /api/productos**
   - Devuelve array completo de productos
   - Status: 200 OK
   - Response: `[{id, nombre, precio, imagen, ...}, ...]`

2. **GET /api/productos/:id**
   - Devuelve un producto específico
   - Status: 200 OK si existe, 404 si no existe
   - Response: `{id, nombre, precio, imagen, ...}`

#### Middlewares
1. **Logger**: Console.log de método y URL de cada petición
2. **express.json()**: Para procesar JSON en peticiones POST
3. **404 Handler**: Para rutas no encontradas
4. **Error Handler**: Manejador centralizado de errores

---

### Frontend (React)

#### Estructura de Carpetas
```
/client
  /src
    /components
      Header.jsx
      Footer.jsx
      ProductCard.jsx
      ProductList.jsx
      ProductDetail.jsx
      CartIcon.jsx
      ContactForm.jsx
    /pages
      HomePage.jsx
      CatalogPage.jsx
      ContactPage.jsx
    /services
      productosService.js
    /styles
      components/
      pages/
    App.js
    index.js
  /public
  package.json
```

#### Componentes Requeridos

1. **<Header />**
   - Navbar con logo y navegación
   - Incluye `<CartIcon />`

2. **<ProductCard />**
   - Props: `producto`, `onProductClick`, `onAddToCart`
   - Muestra: imagen, nombre, precio
   - Botones: "Ver detalles", "Añadir al carrito"

3. **<ProductList />**
   - Props: `productos`, `loading`, `error`, `onProductClick`, `onAddToCart`
   - Renderiza array de `<ProductCard />`
   - Maneja estados de carga y error

4. **<ProductDetail />**
   - Props: `producto`, `onBack`, `onAddToCart`
   - Muestra información completa del producto
   - Botón "Volver al catálogo"

5. **<CartIcon />**
   - Props: `itemCount`
   - Muestra contador de items en el carrito

6. **<ContactForm />**
   - Inputs controlados: nombre, email, mensaje
   - Validación básica
   - Mensaje de éxito al enviar

7. **<Footer />**
   - Links a redes sociales
   - Información de contacto

---

## 🎓 Conceptos de Aprendizaje

### Backend
- ✅ Servidor web con Node.js y Express
- ✅ API REST básica
- ✅ Rutas modulares con express.Router
- ✅ Middlewares personalizados
- ✅ Manejo de errores HTTP

### Frontend
- ⚠️ Arquitectura de componentes
- ⚠️ useState para manejo de estado
- ⚠️ Props para pasar datos
- ⚠️ Eventos en React
- ⚠️ Renderizado de listas con .map()
- ⚠️ Keys en listas
- ⚠️ Renderizado condicional
- ⚠️ useEffect para peticiones HTTP
- ⚠️ fetch API
- ⚠️ Componentes controlados

---

## 📊 Checklist de Entrega

### Código
- [ ] Repositorio en GitHub con carpetas `/backend` y `/client`
- [ ] Commits de todos los integrantes
- [ ] `.gitignore` configurado correctamente
- [ ] Código comentado y organizado

### Backend
- [ ] Servidor Express funcional
- [ ] Endpoints GET implementados
- [ ] Middleware de logging
- [ ] Manejo de errores 404 y 500
- [ ] Datos de productos en archivo local

### Frontend
- [ ] Aplicación React funcional
- [ ] Componentes modulares y reutilizables
- [ ] Fetch de datos desde API propia
- [ ] Estados de carga y error
- [ ] Renderizado condicional para vista de detalle
- [ ] Carrito con estado en App.js
- [ ] Formulario de contacto controlado

### Documentación
- [ ] README.md completo con:
  - [ ] Nombre del proyecto e integrantes
  - [ ] Instrucciones de instalación
  - [ ] Comandos para iniciar servidores
  - [ ] Descripción de arquitectura
  - [ ] Decisiones técnicas

---

## 🚀 Comandos de Inicio

### Backend
```bash
cd backend
npm install
npm start
# Servidor en http://localhost:3001
```

### Frontend
```bash
cd client
npm install
npm start
# Aplicación en http://localhost:3000
```

---

## 📅 Timeline Sugerido

| Fase | Tiempo Estimado | Prioridad |
|------|----------------|-----------|
| Fase 3 | 2-3 horas | Alta |
| Fase 4 | 3-4 horas | Alta |
| Fase 5 | 2-3 horas | Alta |
| Fase 6 | 2-3 horas | Media |
| Fase 7 | 2-3 horas | Media |
| Fase 8 | 1-2 horas | Media |
| Fase 9 | 3-4 horas | Baja |
| Fase 10 | 2-3 horas | Alta |

**Total estimado: 17-25 horas de trabajo**

---

## 💡 Notas Importantes

1. **No usar React Router todavía**: La navegación se hace con renderizado condicional
2. **No usar base de datos**: Los datos viven en un archivo .js local
3. **CORS**: Puede ser necesario configurar CORS en Express para que React pueda hacer peticiones
4. **Puertos**: Backend en 3001, Frontend en 3000
5. **Commits**: Asegurar participación de todos los integrantes en el historial de Git

---

## 🎯 Criterios de Éxito

El proyecto estará completo cuando:
1. ✅ El backend responda correctamente a todas las peticiones
2. ⚠️ El frontend cargue y muestre productos desde la API
3. ⚠️ La navegación entre catálogo y detalle funcione
4. ⚠️ El carrito actualice su contador correctamente
5. ⚠️ El formulario de contacto sea funcional
6. ⚠️ La aplicación sea responsive
7. ⚠️ El README esté completo y claro
8. ⚠️ Todos los integrantes tengan commits en el repo
