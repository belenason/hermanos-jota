/*
===========================================
  HERMANOS JOTA - FUNCIONES JAVASCRIPT
===========================================

// ==========================================
// 1. DATOS DE PRODUCTOS
// ==========================================

/**
 * Catálogo de datos de productos
 * @type {Array<Object>} Array de objetos producto con propiedades completas
 */
const PRODUCTS = [
  {
    id: 1,
    nombre: "Aparador Uspallata",
    precio: 80.00,
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    medidas: "180 x 45 x 75 cm",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    acabado: "Aceite natural ecológico",
    peso: "68 kg",
    capacidad: "6 compartimentos interiores",
    imagenes: [
      "img/aparador_uspallata.png",
    ]
  },
  {
    id: 2,
    nombre: "Biblioteca Recoleta",
    precio: 0,
    descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    medidas: "100 x 35 x 200 cm",
    materiales: "Estructura de acero, estantes de roble",
    acabado: "Laca mate ecológica",
    capacidad: "45 kg por estante",
    modulares: "5 estantes ajustables",
    imagenes: [
      "img/biblioteca_recoleta.png"
    ]
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    precio: 0,
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    medidas: "80 x 75 x 85 cm",
    materiales: "Guatambú macizo, tela bouclé",
    acabado: "Cera vegetal, tapizado premium",
    tapizado: "Repelente al agua y manchas",
    confort: "Espuma alta densidad",
    imagenes: [
      "img/butacaMendoza.png"
    ]
  },
  {
    id: 4,
    nombre: "Sillón Copacabana",
    precio: 0,
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    medidas: "90 x 85 x 95 cm",
    materiales: "Cuero curtido vegetal, acero pintado",
    acabado: "Cuero anilina premium",
    rotacion: "360° silenciosa y suave",
    garantia: "10 años en estructura",
    imagenes: [
      "img/sillon_copacabana.png"
    ]
  },
  { 
    id: 5,
    nombre: "Mesa de Centro Araucaria",
    precio: 0,
    descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
    medidas: "90 x 90 x 45 cm",
    materiales: "Sobre de mármol Patagonia, patas de nogal",
    acabado: "Mármol pulido, aceite natural en madera",
    peso:"42 kg",
    cargaMaxima:"25 kg distribuidos",
    imagenes: [
      "img/mesa_de_centro_araucaria.png"
    ]
  },
  {
    id: 6,
    nombre: "Mesa de Noche Aconcagua ",
    precio: 0,
    descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales. ",
    medidas: "45 x 35 x 60 cm",
    materiales: "Roble macizo FSC®, herrajes soft-close",
    acabado: "Barniz mate de poliuretano",
    almacenamiento:"1 cajón + repisa inferior",
    caracteristucas:"Cajón con cierre suave",
    imagenes:[
      "img/mesa_de_noche_aconcagua.png"
    ]
  },
  {
    id: 7,
    nombre: "Cama Neuquén",
    precio: 0,
    descripcion: "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia, ideal para dormitorios contemporáneos que buscan paz y simplicidad.",
    medidas: "160 x 200 x 90 cm",
    materiales: "Roble macizo FSC®, tapizado en lino",
    acabado: "Aceite natural, tapizado premium",
    colchon: "Compatible con colchón 160 x 200",
    caracteristicas: "Cabecero flotante acolchado",
    imagenes: [
      "img/cama_neuquen.png"
    ]
  },
  {
    id: 8,
    nombre: "Sofá Patagonia",
    precio: 0,
    descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, brindando comodidad duradera y sostenible para el hogar moderno.",
    medidas: "220 x 90 x 80 cm",
    estructura:  "Madera de eucalipto FSC®",
    tapizado: "Lino 100% natural premium",
    relleno: "Espuma HR + plumón reciclado",
    sostenibilidad: "Materiales 100% reciclables",
    imagenes: [
      "img/sofa_patagonia.png"
    ]
  },
  {
    id: 9,
    nombre: "Mesa Comedor Pampa",
    precio: 0,
    descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
    medidas: "160-240 x 90 x75 cm",
    materiales: "Roble macizo FSC®, mecanismo alemán",
    acabado: "Aceite-cera natural",
    capacidad: "6-10 comensales",
    extension: "Sistema de mariposa central",
    imagenes: [
      "img/mesa_comedor_pampa.png"
    ]
  },
  {
    id: 10,
    nombre: "Sillas Córdoba",
    precio: 0,
    descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
    medidas: "45 x 52 x 80 cm (cada una)",
    materiales: "Contrachapado nogal, tubo de acero",
    acabado: "Laca mate, pintura epoxi",
    apilables: "Hasta 6 sillas",
    incluye: "Set de 4 sillas",
    imagenes: [
      "img/sillas_cordoba.png"
    ]
  },
  {
    id: 11,
    nombre: "Escritorio Costa",
    precio: 0,
    descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    medidas: "120 x 60 x 75 cm",
    materiales: "Bambú laminado, herrajes ocultos",
    acabado: "Laca mate resistente",
    almacenamiento: "1 cajón con organizador",
    cables: "Pasacables integrado",
    imagenes: [
      "img/escritorio_costa.png"
    ]
  },
  {
    id: 12,
    nombre: "Silla de Trabajo Belgrano",
    precio: 0,
    descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    medidas: "60 x 60 x 90-100 cm",
    materiales: "Malla técnica, tejido reciclado",
    acabado: "Base cromada, tapizado premium",
    regulacion: "Altura + inclinación respaldo",
    certificacion: "Ergonomía europea EN 1335",
    imagenes: [
      "img/silla_de_trabajo_belgrano.png"
    ]
  }
];

// ==========================================
// 2. FUNCIONES DE UTILIDAD
// ==========================================

/**
 * Formatea números como moneda argentina
 * @param {number} n - Número a formatear
 * @returns {string} Precio formateado en pesos argentinos
 */
function formatARS(n) {
  return Number(n || 0).toLocaleString("es-AR", { 
    style: "currency", 
    currency: "ARS", 
    maximumFractionDigits: 0 
  });
}

/**
 * Obtiene el carrito del localStorage con manejo de errores
 * @returns {Array} Array de items del carrito
 */
function getCart() {
  try { 
    return JSON.parse(localStorage.getItem("cart") || "[]"); 
  } catch { 
    return []; 
  }
}

/**
 * Calcula el número total de items en el carrito
 * @returns {number} Cantidad total de items
 */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + (parseInt(item.qty, 10) || 0), 0);
}

/**
 * Actualiza el badge visual del contador del carrito
 */
function renderCartBadge() {
  const badge = document.querySelector(".elbadge");
  if (badge) badge.textContent = getCartCount();
}

/**
 * Muestra un indicador de carga
 * @param {HTMLElement} container - Contenedor donde mostrar el loader
 */
function showLoader(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="text-center justify-content-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando productos...</span>
      </div>
      <p class="mt-2 text-muted">Cargando productos...</p>
    </div>
  `;
}

// ==========================================
// 3. SERVICIOS ASÍNCRONOS
// ==========================================

/**
 * Simula una llamada a API para obtener productos con retraso asíncrono
 * @param {number} delay - Tiempo de retraso en milisegundos (por defecto 1000ms)
 * @returns {Promise<Array>} Promise que resuelve con el array de productos
 */
function fetchProducts(delay = 1000) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 Simulando carga de productos (${delay}ms)...`);
    
    setTimeout(() => {
      try {
        // Simular posibles errores de red (5% de probabilidad)
        if (Math.random() < 0.05) {
          throw new Error('Error de conexión simulado');
        }
        
        console.log('✅ Productos cargados exitosamente');
        resolve([...PRODUCTS]); // Clonar array para simular datos de API
      } catch (error) {
        console.error('❌ Error al cargar productos:', error);
        reject(error);
      }
    }, delay);
  });
}

/**
 * Obtiene un producto específico por ID de forma asíncrona
 * @param {number} id - ID del producto a buscar
 * @param {number} delay - Tiempo de retraso en milisegundos (por defecto 500ms)
 * @returns {Promise<Object|null>} Promise que resuelve con el producto o null si no se encuentra
 */
async function fetchProductById(id, delay = 500) {
  try {
    console.log(`🔄 Buscando producto ID: ${id}...`);
    
    // Simular retraso de API
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const product = PRODUCTS.find(p => p.id === Number(id));
    
    if (!product) {
      console.warn(`⚠️ Producto con ID ${id} no encontrado`);
      return null;
    }
    
    console.log(`✅ Producto encontrado: ${product.nombre}`);
    return { ...product }; // Clonar objeto para simular datos de API
    
  } catch (error) {
    console.error('❌ Error al buscar producto:', error);
    throw error;
  }
}

/**
 * Simula búsqueda de productos con filtros
 * @param {string} query - Término de búsqueda
 * @param {number} delay - Tiempo de retraso en milisegundos
 * @returns {Promise<Array>} Promise que resuelve con productos filtrados
 */
async function searchProducts(query, delay = 300) {
  try {
    console.log(`🔍 Buscando productos: "${query}"...`);
    
    // Simular retraso de búsqueda
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const filtered = query.trim() === '' 
      ? [...PRODUCTS]
      : PRODUCTS.filter(p =>
          (p.nombre && p.nombre.toLowerCase().includes(query.toLowerCase())) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(query.toLowerCase()))
        );
    
    console.log(`✅ Encontrados ${filtered.length} productos`);
    return filtered;
    
  } catch (error) {
    console.error('❌ Error en búsqueda:', error);
    throw error;
  }
}

// ==========================================
// 4. FUNCIONALIDAD DEL NAVBAR
// ==========================================

/**
 * IIFE para inicializar el comportamiento del navbar
 * Gestiona la transparencia del navbar y comportamiento móvil:
 * - Navbar transparente en desktop cuando está en el tope de la página
 * - Fondo sólido cuando se hace scroll o en móvil
 * - Maneja estados de colapso del menú móvil
 */
(function initializeNavbar() {
  const navbar = document.querySelector(".custom-navbar");
  const collapse = document.querySelector(".navbar-collapse");
  
  // Salir si el navbar no existe en la página actual
  if (!navbar) return;

  /**
   * Verifica si el viewport actual es de tamaño desktop
   * @returns {boolean} True si es desktop (768px+), false si es móvil
   */
  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  /**
   * Detecta si estamos en la página de producto
   * @returns {boolean} True si estamos en producto.html
   */
  const isProductPage = () => {
    return window.location.pathname.includes('producto.html') || 
           document.body.classList.contains('product-page') ||
           document.querySelector('.product-gallery') !== null;
  };

  /**
   * Aplica el estilo apropiado del navbar basado en posición del scroll y tipo de dispositivo
   */
  function applyNavbarState() {
    // En móvil: siempre mostrar fondo sólido para legibilidad
    if (!isDesktop()) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
      return;
    }

    // En página de producto: NUNCA transparente, siempre fondo sólido
    if (isProductPage()) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
      return;
    }

    // En otras páginas desktop: alternar transparencia basado en posición del scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");     // Fondo sólido + sombra
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.add("transparent");  // Fondo transparente
      navbar.classList.remove("scrolled");
    }
  }

  // Event Listeners para el navbar
  document.addEventListener("DOMContentLoaded", applyNavbarState);
  window.addEventListener("scroll", applyNavbarState, { passive: true });
  window.addEventListener("resize", applyNavbarState);

  // Manejo del colapso del menú móvil
  if (collapse) {
    collapse.addEventListener("show.bs.collapse", () => {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    });
    
    collapse.addEventListener("hide.bs.collapse", applyNavbarState);
  }
})();

// ==========================================
// 5. FUNCIONALIDAD DEL CATÁLOGO DE PRODUCTOS
// ==========================================

// ========== 5.1. INICIALIZACIÓN DE PRODUCTOS ==========

/**
 * Inicializa la visualización del catálogo de productos para páginas home y catálogo
 * con carga asíncrona simulada
 */
async function initProductos() {
  console.log('🚀 Inicializando productos con carga asíncrona');
  
  // Verificación de existencia de contenedores
  const desktopContainer = document.getElementById("products-container");
  const carouselContainer = document.getElementById("products-carousel-container");
  const indicatorsContainer = document.getElementById("products-carousel-indicators");

  if (!desktopContainer || !carouselContainer) {
    console.log('Contenedores de productos no encontrados en esta página');
    return;
  }

  // Prevenir duplicación
  if (desktopContainer.children.length > 0) {
    console.log('Productos ya cargados, evitando duplicación');
    return;
  }

  try {
    // Mostrar loader
    showLoader(desktopContainer);
    showLoader(carouselContainer);
    
    // Cargar productos de forma asíncrona
    const products = await fetchProducts(1500); // 1.5 segundos de carga
    
    // Transformar datos para vista simplificada
    const productos = products.map(p => ({
      id: p.id,
      nombre: p.nombre,
      precio: `$${p.precio.toLocaleString("es-AR")}`,
      img: p.imagenes[0]
    }));

    console.log('📦 Renderizando productos cargados...');

    // Limpiar contenedores
    desktopContainer.innerHTML = '';
    carouselContainer.innerHTML = '';
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
    }

    // Variables para acumular HTML
    let desktopHTML = '';
    let carouselHTML = '';
    let indicatorsHTML = '';

    // Generar HTML para cada producto (limitado a los primeros 4)
    productos.forEach((prod, index) => {
      if(prod.id <= 4){
        // HTML para grilla desktop
        desktopHTML += `
          <div class="col-md-3 col-sm-6">
            <article class="product-card text-center h-100">
              <a href="producto.html?id=${encodeURIComponent(prod.id)}" style="text-decoration:none; color:inherit;">
                <div class="product-image">
                  <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid">
                </div>
                <div class="product-info">
                  <h3 class="product-dest-title">${prod.nombre}</h3>
                  <p class="product-price">${prod.precio}</p>
                </div>
              </a>
            </article>
          </div>
        `;
        
        // HTML para carrusel móvil
        carouselHTML += `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <article class="product-card mx-auto text-center">
              <a href="producto.html?id=${encodeURIComponent(prod.id)}" style="text-decoration:none; color:inherit;">
                <div class="product-image">
                  <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid">
                </div>
                <div class="product-info">
                  <h3 class="product-dest-title">${prod.nombre}</h3>
                  <p class="product-price">${prod.precio}</p>
                </div>
              </a>
            </article>
          </div>
        `;

        // HTML para indicadores del carrusel
        if (indicatorsContainer) {
          indicatorsHTML += `
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" 
                    class="${index === 0 ? 'active' : ''}" 
                    aria-current="${index === 0 ? 'true' : 'false'}" 
                    aria-label="Slide ${index + 1}"></button>
          `;
        }
      }
    });

    // Insertar HTML generado (una sola operación DOM por contenedor)
    desktopContainer.innerHTML = desktopHTML;
    carouselContainer.innerHTML = carouselHTML;
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = indicatorsHTML;
    }

    console.log('✅ Productos renderizados correctamente:', productos.length, 'productos');
    
  } catch (error) {
    console.error('❌ Error al cargar productos:', error);
    
    // Mostrar mensaje de error
    const errorHTML = `
      <div class="alert alert-danger text-center" role="alert">
        <h5>Error al cargar productos</h5>
        <p>No se pudieron cargar los productos. Por favor, recarga la página.</p>
        <button class="btn btn-primary" onclick="location.reload()">Recargar página</button>
      </div>
    `;
    
    desktopContainer.innerHTML = errorHTML;
    carouselContainer.innerHTML = errorHTML;
  }
}

// ========== 5.2. RENDERIZADO DEL CATÁLOGO ==========

/**
 * Renderiza la grilla del catálogo con productos filtrados
 * @param {Array} products - Array de productos a mostrar
 */
function renderCatalogGrid(products) {
  const grid = document.querySelector(".grilla");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3 class="text-muted">No se encontraron productos</h3>
        <p>Intenta con otros términos de búsqueda</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const img = (p.imagenes && p.imagenes[0]) ? p.imagenes[0] : "img/producto-ejemplo.jpg";
    return `
      <article class="estiloProducto botonAgregarCarro">
        <a href="producto.html?id=${encodeURIComponent(p.id)}" style="text-decoration:none;color:inherit;">
          <img src="${img}" alt="${p.nombre}" />
          <div class="estiloProducto-content">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion ? p.descripcion : ""}</p>
            <span class="price">${formatARS(p.precio)}</span>
          </div>
        </a>
        <button class="btn-add-to-cart" data-id="${p.id}">Agregar al Carrito</button>
      </article>
    `;
  }).join("");
}

// ========== 5.3. PÁGINA DEL CATÁLOGO ==========

/**
 * Inicializa la página del catálogo de productos con carga asíncrona
 */
async function initCatalogPage() {
  const grid = document.querySelector(".grilla");
  const input = document.getElementById("search-input");
  const button = input ? input.parentElement.querySelector("button") : null;
  
  // Solo ejecutar si existe la grilla (página productos.html)
  if (!grid) return;

  try {
    console.log('🚀 Inicializando catálogo con carga asíncrona');
    
    // Mostrar loader inicial
    showLoader(grid);
    
    // Cargar productos de forma asíncrona
    const products = await fetchProducts(1200); // 1.2 segundos de carga
    
    // Renderizar productos cargados
    renderCatalogGrid(products);
    
    const alerta = document.getElementById("alerta-carrito");

    // Funcionalidad agregar al carrito con addEventListener
    grid.addEventListener("click", async (e) => {
      const btn = e.target.closest(".btn-add-to-cart");
      if (!btn) return;
      
      // Prevenir múltiples clics
      if (btn.disabled) return;
      btn.disabled = true;
      btn.textContent = "Agregando...";
      
      try {
        const id = btn.getAttribute("data-id");
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        
        // Simular proceso asíncrono de agregar al carrito
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (item) item.qty += 1; 
        else cart.push({ id, qty: 1 });
        
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartBadge();

        // Mostrar alerta de confirmación
        if (alerta) {
          alerta.classList.add("mostrar");
          setTimeout(() => {
            alerta.classList.remove("mostrar");
          }, 3000);
        }
        
        console.log(`✅ Producto ${id} agregado al carrito`);
        
      } catch (error) {
        console.error('❌ Error al agregar al carrito:', error);
      } finally {
        // Restaurar botón
        btn.disabled = false;
        btn.textContent = "Agregar al Carrito";
      }
    });

    // Funcionalidad de búsqueda asíncrona
    let searchTimeout;
    const doSearch = async () => {
      const query = (input?.value || "").trim();
      
      try {
        // Realizar búsqueda asíncrona
        const filtered = await searchProducts(query, 300);
        renderCatalogGrid(filtered);
        
        // Remover indicador
        searchIndicator?.remove();
        
      } catch (error) {
        console.error('❌ Error en búsqueda:', error);
        // En caso de error, usar búsqueda local como fallback
        const filtered = query === '' ? products : products.filter(p =>
          (p.nombre && p.nombre.toLowerCase().includes(query.toLowerCase())) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(query.toLowerCase()))
        );
        renderCatalogGrid(filtered);
      }
    };

    // Event listeners para búsqueda con debounce
    input?.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(doSearch, 500); // Debounce de 500ms
    });
    
    button?.addEventListener("click", (ev) => { 
      ev.preventDefault(); 
      clearTimeout(searchTimeout);
      doSearch(); 
    });
    
    console.log('✅ Catálogo inicializado correctamente');
    
  } catch (error) {
    console.error('❌ Error al inicializar catálogo:', error);
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="alert alert-danger">
          <h4>Error al cargar el catálogo</h4>
          <p>No se pudieron cargar los productos. Por favor, recarga la página.</p>
          <button class="btn btn-secondary" onclick="location.reload()">Recargar página</button>
        </div>
      </div>
    `;
  }
}

// ==========================================
// 6. PÁGINA DE PRODUCTO INDIVIDUAL
// ==========================================

/**
 * Inicializa la página de producto individual con carga asíncrona
 */
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product");
  
  // Solo ejecutar en producto.html
  if (!container) return;

  try {
    console.log('🚀 Inicializando página de producto individual');
    
    // Mostrar loader inicial
    showLoader(container);
    
    // Obtener ID del producto de los parámetros URL
    const params = new URLSearchParams(location.search);
    const productId = Number(params.get("id"));
    
    if (!productId) {
      container.innerHTML = `
        <div class="alert alert-warning">
          <h2>ID de producto no válido</h2>
          <p><a href="productos.html" class="btn btn-primary">Volver al catálogo</a></p>
        </div>
      `;
      return;
    }
    
    // Cargar producto de forma asíncrona
    const product = await fetchProductById(productId, 800);
    
    if (!product) {
      container.innerHTML = `
        <div class="alert alert-warning">
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <p><a href="productos.html" class="btn btn-primary">Volver al catálogo</a></p>
        </div>
      `;
      return;
    }

    // ========== GENERACIÓN DE HTML DEL PRODUCTO ==========
    
    console.log('📦 Renderizando producto:', product.nombre);
    
    const carouselId = "productGallery";
    const imgs = (product.imagenes && product.imagenes.length ? product.imagenes : ['img/producto-ejemplo.jpg']);

    // Generar slides del carrusel
    const slides = imgs.map((src, i) => `
      <div class="carousel-item ${i===0 ? 'active':''}">
        <img src="${src}" class="d-block w-100" alt="${product.nombre} ${i+1}">
      </div>
    `).join("");

    // Generar indicadores del carrusel
    const indicators = imgs.map((_, i) => `
      <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}" 
              class="${i===0?'active':''}" aria-label="Slide ${i+1}"></button>
    `).join("");

    // HTML completo del producto
    container.innerHTML = `
      <h1 class="product-title">${product.nombre}</h1>

      <section class="product-gallery mb-3">
        <div id="${carouselId}" class="carousel slide" data-bs-ride="false">
          <div class="carousel-indicators">
            ${indicators}
          </div>
          <div class="carousel-inner">
            ${slides}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>

        <!-- Miniaturas -->
        <div class="product-thumbs">
          ${imgs.map((src, i)=>`<img src="${src}" data-idx="${i}" class="${i===0?'active':''}" alt="Thumb ${i+1}">`).join("")}
        </div>
      </section>

      <section class="product-detail">
        <div class="row g-4">
          <div class="col-lg-7">
            ${product.descripcion ? `<p class="product-desc">${product.descripcion}</p>` : ""}
            <ul class="product-specs">
              ${product.medidas ? `<li><strong>Medidas:</strong> ${product.medidas}</li>` : ""}
              ${product.materiales ? `<li><strong>Materiales:</strong> ${product.materiales}</li>` : ""}
              ${product.acabado ? `<li><strong>Acabado:</strong> ${product.acabado}</li>` : ""}
            </ul>
          </div>
          <div class="col-lg-5">
            <div class="purchase-card">
              <div class="price">$ ${Number(product.precio || 0).toLocaleString("es-AR")}</div>
              <div class="label">Cantidad</div>
              <div class="qty-input mb-3">
                <input id="qty" type="number" min="1" max="99" value="1" class="form-control">
              </div>
              <div class="d-flex gap-2">
                <button id="addToCartBtn" class="btn-brand">Añadir al carrito</button>
                <a href="productos.html" class="btn-outline-brand">Volver al catálogo</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // ========== FUNCIONALIDAD DEL CARRUSEL ==========
    
    const thumbBar = container.querySelector(".product-thumbs");
    const carouselEl = container.querySelector("#" + carouselId);

    /**
     * Activa manualmente un slide específico del carrusel
     * @param {number} idx - Índice del slide a activar
     */
    function activateSlideManually(idx) {
      const items = carouselEl.querySelectorAll(".carousel-item");
      items.forEach((it,i) => it.classList.toggle("active", i===idx));
      
      const indBtns = carouselEl.querySelectorAll(".carousel-indicators [data-bs-slide-to]");
      indBtns.forEach((b,i) => b.classList.toggle("active", i===idx));
      
      thumbBar?.querySelectorAll("img").forEach((t,i) => t.classList.toggle("active", i===idx));
    }

    // Inicialización del carrusel Bootstrap
    let bsCarousel = null;
    if (carouselEl && window.bootstrap && window.bootstrap.Carousel) {
      bsCarousel = new bootstrap.Carousel(carouselEl, { interval: false, ride: false });
      
      // Sincronizar miniaturas con slides del carrusel
      carouselEl.addEventListener("slid.bs.carousel", (e) => {
        const idx = e.to;
        thumbBar?.querySelectorAll("img").forEach((t,i) => {
          t.classList.toggle("active", i===idx);
        });
      });
    }

    // Event listeners para miniaturas
    thumbBar?.querySelectorAll("img").forEach(img => {
      img.addEventListener("click", () => {
        const idx = parseInt(img.getAttribute("data-idx"), 10);
        if (bsCarousel) { 
          bsCarousel.to(idx); 
        } else { 
          activateSlideManually(idx); 
        }
      });
    });

    // Fallback para cuando Bootstrap no está disponible
    if (!bsCarousel && carouselEl) {
      const prev = carouselEl.querySelector(".carousel-control-prev");
      const next = carouselEl.querySelector(".carousel-control-next");
      const items = carouselEl.querySelectorAll(".carousel-item");
      let current = [...items].findIndex(it => it.classList.contains("active"));
      if (current < 0) current = 0;

      function goTo(i) {
        if (i < 0) i = items.length - 1;
        if (i >= items.length) i = 0;
        current = i;
        activateSlideManually(current);
      }
      
      prev?.addEventListener("click", (e) => { 
        e.preventDefault(); 
        goTo(current - 1); 
      });
      
      next?.addEventListener("click", (e) => { 
        e.preventDefault(); 
        goTo(current + 1); 
      });
    }

    // ========== FUNCIONALIDAD AGREGAR AL CARRITO ==========

    const alerta = document.getElementById("alerta-carrito");

    // Event listener para añadir al carrito con cantidad personalizada
    const addBtn = document.getElementById("addToCartBtn");
    addBtn?.addEventListener("click", async () => {
      if (addBtn.disabled) return; // Prevenir múltiples clics
      
      let qty = parseInt(document.getElementById("qty").value, 10);
      if (isNaN(qty) || qty < 1) qty = 1;
      if (qty > 99) qty = 99;

      try {
        // Deshabilitar botón durante el proceso
        addBtn.disabled = true;
        addBtn.textContent = "Agregando...";
        
        // Simular proceso asíncrono
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const cart = getCart();
        const item = cart.find(i => i.id === product.id);
        if (item) item.qty += qty; 
        else cart.push({ id: product.id, qty });
        localStorage.setItem("cart", JSON.stringify(cart));

        renderCartBadge(); // Actualizar contador global
        
        // Mostrar alerta de confirmación
        if (alerta) {
          alerta.classList.add("mostrar");
          setTimeout(() => {
            alerta.classList.remove("mostrar");
          }, 3000);
        }
        
        console.log(`✅ Producto ${product.id} agregado al carrito (cantidad: ${qty})`);
        
      } catch(error) {
        console.error('❌ Error al agregar al carrito:', error);
        alert('Error al agregar el producto al carrito. Por favor, intenta de nuevo.');
      } finally {
        // Restaurar botón
        addBtn.disabled = false;
        addBtn.textContent = "Añadir al carrito";
      }
    });
    
    console.log('✅ Página de producto inicializada correctamente');
    
  } catch (error) {
    console.error('❌ Error al cargar producto:', error);
    container.innerHTML = `
      <div class="alert alert-danger">
        <h2>Error al cargar el producto</h2>
        <p>No se pudo cargar la información del producto. Por favor, intenta de nuevo.</p>
        <div class="d-flex gap-2">
          <button class="btn btn-primary" onclick="location.reload()">Recargar página</button>
          <a href="productos.html" class="btn btn-outline-primary">Volver al catálogo</a>
        </div>
      </div>
    `;
  }
});

// ==========================================
// 7. FUNCIONALIDAD DEL FORMULARIO DE CONTACTO
// ==========================================

/**
 * Inicializa validación y envío del formulario de contacto con procesamiento asíncrono
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  // Solo ejecutar si el formulario existe (página de contacto)
  if (!form || !successMessage) {
    console.log('Formulario de contacto no encontrado en esta página');
    return;
  }

  console.log('✅ Formulario de contacto encontrado');

  // ========== MANEJO DEL ENVÍO DEL FORMULARIO ==========
  
  form.addEventListener("submit", async (event) => {
    console.log('📧 Procesando envío de formulario');
    event.preventDefault();
    event.stopPropagation();

    const submitBtn = form.querySelector('button[type="submit"]');
    const isValid = form.checkValidity();
    form.classList.add('was-validated');

    if (!isValid) {
      console.log('❌ Formulario inválido');
      return;
    }

    try {
      // Deshabilitar botón durante el envío
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      // Simular envío asíncrono del formulario
      console.log('🔄 Simulando envío del formulario...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos

      // Simular posible error de red (5% probabilidad)
      if (Math.random() < 0.05) {
        throw new Error('Error de conexión al servidor');
      }

      console.log('✅ Formulario enviado exitosamente');
      
      // Mostrar mensaje de éxito
      setTimeout(() => {
        successMessage.classList.remove("d-none");
        form.reset();
        form.classList.remove('was-validated');
        
        // Scroll suave hacia el mensaje de éxito
        successMessage.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 500);

    } catch (error) {
      console.error('❌ Error al enviar formulario:', error);
      alert('Error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      // Restaurar botón
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar mensaje";
      }
    }
  });

  // ========== VALIDACIÓN EN TIEMPO REAL ==========
  
  const inputs = form.querySelectorAll('.form-control');
  console.log('Inputs encontrados:', inputs.length);
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
    });
    
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        if (input.checkValidity()) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
        }
      }
    });
  });

  console.log('✅ Formulario de contacto inicializado correctamente');
}

// ==========================================
// 8. MEJORA DE ACCESIBILIDAD DEL CARRUSEL
// ==========================================

/**
 * Características mejoradas de accesibilidad del carrusel principal
 */
function initCarouselAccessibility() {
  console.log('🔧 Inicializando accesibilidad del carrusel');
  
  const carousel = document.getElementById('heroCarousel');
  
  if (!carousel) {
    console.log('Carrusel principal no encontrado en esta página');
    return;
  }
  
  // ========== ACTUALIZACIÓN DE ESTADOS ARIA ==========
  
  carousel.addEventListener('slid.bs.carousel', function(e) {
    const activeIndex = e.to;
    
    const indicators = carousel.querySelectorAll('.carousel-indicators button');
    indicators.forEach((indicator, index) => {
      indicator.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
    });
    
    console.log('🎠 Carrusel cambió a diapositiva:', activeIndex + 1);
  });
  
  // ========== NAVEGACIÓN POR TECLADO ==========
  
  const indicators = carousel.querySelectorAll('.carousel-indicators button');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('keydown', function(e) {
      let newIndex = index;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = index > 0 ? index - 1 : indicators.length - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = index < indicators.length - 1 ? index + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = indicators.length - 1;
          break;
        default:
          return;
      }
      
      indicators[newIndex].focus();
      indicators[newIndex].click();
    });
  });

  console.log('✅ Accesibilidad del carrusel inicializada correctamente');
}

// ==========================================
// 9. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================

/**
 * Función principal de inicialización de la aplicación con manejo asíncrono
 */
async function initApp() {
  // Prevenir múltiples inicializaciones
  if (window.appInitialized) return;   
  window.appInitialized = true;
  
  console.log('🚀 Inicializando aplicación con carga asíncrona');
  console.log('📄 Estado de document ready:', document.readyState);
  console.log('🔗 Página actual:', window.location.pathname);
  
  try {
    // ========== INICIALIZACIÓN INMEDIATA ==========
    
    // Inicializar contador de carrito (siempre presente)
    renderCartBadge();
    console.log('✅ Badge del carrito inicializado');

    // Inicializar accesibilidad del carrusel (si existe)
    initCarouselAccessibility();
    
    // Inicializar formulario de contacto (si existe)
    initContactForm();
    
    // ========== INICIALIZACIÓN ASÍNCRONA ==========
    
    // Crear array de promesas para inicialización concurrente
    const initPromises = [];
    
    // Productos destacados (home/catálogo) - asíncrono
    if (document.getElementById("products-container") || document.getElementById("products-carousel-container")) {
      initPromises.push(
        initProductos().catch(error => {
          console.error('❌ Error en initProductos:', error);
        })
      );
    }
    
    // Catálogo completo (productos.html) - asíncrono
    if (document.querySelector(".grilla")) {
      initPromises.push(
        initCatalogPage().catch(error => {
          console.error('❌ Error en initCatalogPage:', error);
        })
      );
    }
    
    // Ejecutar todas las inicializaciones asíncronas en paralelo
    if (initPromises.length > 0) {
      console.log(`🔄 Ejecutando ${initPromises.length} inicializaciones asíncronas...`);
      await Promise.allSettled(initPromises);
    }
    
    console.log('🎉 Inicialización completada exitosamente');
    
    // Disparar evento personalizado para indicar que la app está lista
    window.dispatchEvent(new CustomEvent('hermanos-jota-ready', {
      detail: { timestamp: Date.now() }
    }));
    
  } catch (error) {
    console.error('❌ Error crítico durante la inicialización:', error);
  }
}

// ========== CONFIGURACIÓN DE EVENT LISTENERS ==========

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  console.log('⏳ DOM cargando, esperando DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  console.log('✅ DOM ya listo, ejecutando inmediatamente');
  initApp();
}

// Respaldo: ejecutar también en window.load por seguridad
window.addEventListener('load', function() {
  console.log('🔄 Window load event disparado');
  if (!window.appInitialized) {
    console.log('⚠️  Ejecutando inicialización de respaldo');
    initApp();
  } else {
    console.log('✅ Aplicación ya inicializada anteriormente');
  }
});

// Event listener para el evento personalizado (opcional, para debugging)
window.addEventListener('hermanos-jota-ready', function(e) {
  console.log('🎊 Aplicación Hermanos Jota completamente cargada:', new Date(e.detail.timestamp));
});
