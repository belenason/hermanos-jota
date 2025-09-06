/*
===========================================
  HERMANOS JOTA - JAVASCRIPT FUNCTIONS
===========================================
  Main JavaScript file for website functionality
  Includes: Navbar behavior, Product display, 
  Contact forms, and general interactions
===========================================
*/

// ==========================================
// 1. NAVBAR FUNCTIONALITY
// ==========================================

/**
 * Manages navbar transparency and mobile behavior
 * - Transparent navbar on desktop when at top of page
 * - Solid background when scrolled or on mobile
 * - Handles mobile menu collapse states
 */
(function initializeNavbar() {
  const navbar = document.querySelector(".custom-navbar");
  const collapse = document.querySelector(".navbar-collapse");
  
  // Exit if navbar doesn't exist on current page
  if (!navbar) return;

  /**
   * Checks if current viewport is desktop size
   * @returns {boolean} True if desktop (768px+), false if mobile
   */
  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  /**
   * Applies appropriate navbar styling based on scroll position and device type
   */
  function applyNavbarState() {
    // On mobile: always show solid background for readability
    if (!isDesktop()) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
      return;
    }

    // On desktop: toggle transparency based on scroll position
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");     // Solid background + shadow
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.add("transparent");  // Transparent background
      navbar.classList.remove("scrolled");
    }
  }

  // Apply navbar state on page load
  document.addEventListener("DOMContentLoaded", applyNavbarState);
  
  // Update navbar state on scroll (passive for better performance)
  window.addEventListener("scroll", applyNavbarState, { passive: true });
  
  // Update navbar state when window is resized
  window.addEventListener("resize", applyNavbarState);

  // Handle mobile menu collapse states
  if (collapse) {
    // When mobile menu opens: force solid background
    collapse.addEventListener("show.bs.collapse", () => {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    });
    
    // When mobile menu closes: restore normal state
    collapse.addEventListener("hide.bs.collapse", applyNavbarState);
  }
})();


// ==========================================
// 2. INDIVIDUAL PRODUCT PAGE FUNCTIONALITY
// ==========================================

/**
 * Handles individual product page display and interactions
 * - Generates product gallery carousel with thumbnails
 * - Displays product specifications and details
 * - Manages add to cart functionality
 * - Updates cart badge counter
 */
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product");
  if (!container) return; // solo corre en producto.html

  const params = new URLSearchParams(location.search);
  const productId = params.get("id");

  const products = typeof fetchProducts === "function" ? await fetchProducts() : (window.PRODUCTS || []);
  const p = products.find(x => x.id === productId);

  if (!p) {
    container.innerHTML = `
      <h2>Producto no encontrado</h2>
      <p><a href="productos.html">Volver al catálogo</a></p>
    `;
    return;
  }

  // ====== Título + Carrusel + Detalle ======
  const carouselId = "productGallery";
  const imgs = (p.imagenes && p.imagenes.length ? p.imagenes : ['img/producto-ejemplo.jpg']);

  const slides = imgs.map((src, i) => `
    <div class="carousel-item ${i===0 ? 'active':''}">
      <img src="${src}" class="d-block w-100" alt="${p.nombre} ${i+1}">
    </div>
  `).join("");

  const indicators = imgs.map((_, i) => `
    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}" class="${i===0?'active':''}" aria-label="Slide ${i+1}"></button>
  `).join("");

  container.innerHTML = `
    <h1 class="product-title">${p.nombre}</h1>

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

      <!-- Thumbs -->
      <div class="product-thumbs">
        ${imgs.map((src, i)=>`<img src="${src}" data-idx="${i}" class="${i===0?'active':''}" alt="Thumb ${i+1}">`).join("")}
      </div>
    </section>

    <section class="product-detail">
      <div class="row g-4">
        <div class="col-lg-7">
          ${p.descripcion ? `<p class="product-desc">${p.descripcion}</p>` : ""}
          <ul class="product-specs">
            ${p.medidas ? `<li><strong>Medidas:</strong> ${p.medidas}</li>` : ""}
            ${p.materiales ? `<li><strong>Materiales:</strong> ${p.materiales}</li>` : ""}
            ${p.acabado ? `<li><strong>Acabado:</strong> ${p.acabado}</li>` : ""}
          </ul>
        </div>
        <div class="col-lg-5">
          <div class="purchase-card">
            <div class="price">$ ${Number(p.precio || 0).toLocaleString("es-AR")}</div>
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

  // ====== Carrusel: thumbnails + flechas ======
  const thumbBar = container.querySelector(".product-thumbs");
  const carouselEl = container.querySelector("#" + carouselId);

  function activateSlideManually(idx){
    const items = carouselEl.querySelectorAll(".carousel-item");
    items.forEach((it,i)=>it.classList.toggle("active", i===idx));
    const indBtns = carouselEl.querySelectorAll(".carousel-indicators [data-bs-slide-to]");
    indBtns.forEach((b,i)=>b.classList.toggle("active", i===idx));
    thumbBar?.querySelectorAll("img").forEach((t,i)=>t.classList.toggle("active", i===idx));
  }

  let bsCarousel = null;
  if (carouselEl && window.bootstrap && window.bootstrap.Carousel){
    bsCarousel = new bootstrap.Carousel(carouselEl, { interval: false, ride: false });
    carouselEl.addEventListener("slid.bs.carousel", (e)=>{
      const idx = e.to;
      thumbBar?.querySelectorAll("img").forEach((t,i)=>{
        t.classList.toggle("active", i===idx);
      });
    });
  }

  thumbBar?.querySelectorAll("img").forEach(img=>{
    img.addEventListener("click", ()=>{
      const idx = parseInt(img.getAttribute("data-idx"), 10);
      if (bsCarousel){ bsCarousel.to(idx); } else { activateSlideManually(idx); }
    });
  });

  if (!bsCarousel && carouselEl){
    const prev = carouselEl.querySelector(".carousel-control-prev");
    const next = carouselEl.querySelector(".carousel-control-next");
    const items = carouselEl.querySelectorAll(".carousel-item");
    let current = [...items].findIndex(it => it.classList.contains("active"));
    if (current < 0) current = 0;

    function goTo(i){
      if (i < 0) i = items.length - 1;
      if (i >= items.length) i = 0;
      current = i;
      activateSlideManually(current);
    }
    prev?.addEventListener("click", (e)=>{ e.preventDefault(); goTo(current - 1); });
    next?.addEventListener("click", (e)=>{ e.preventDefault(); goTo(current + 1); });
  }

  // ====== Añadir al carrito con cantidad ======
  const addBtn = document.getElementById("addToCartBtn");
  addBtn?.addEventListener("click", () => {
    let qty = parseInt(document.getElementById("qty").value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > 99) qty = 99;

    const badge = document.querySelector(".elbadge");
    if (badge) {
      const n = parseInt(badge.textContent, 10) || 0;
      badge.textContent = n + qty;
    }
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const item = cart.find(i => i.id === p.id);
      if (item) item.qty += qty; else cart.push({ id: p.id, qty });
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch(e) {}
  });
});


// ==========================================
// 3. PRODUCT DATA
// ==========================================

/**
 * Product catalog data
 * Contains detailed information for all available products
 * Used by product pages and catalog displays
 */
const PRODUCTS = [
  {
    id: "01",
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
    id: "02",
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
    id: "03",
    nombre: "Butaca Mendoza",
    precio: 0,
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    medidas: "80 x 75 x 85 cm",
    materiales: "Guatambú macizo, tela bouclé",
    acabado: "Cera vegetal, tapizado premium",
    tapizado: "Repelente al agua y manchas",
    confort: "Espuma alta densidad",
    imagenes: [
      "img/butaca_mendoza.png"
    ]
  },

  {
    id: "04",
    nombre: "Sillón Copacabana",
    precio: 0,
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    medidas: "90 x 85 x 95 cm",
    materiales: "Cuero curtido vegetal, acero pintado",
    acabado: "Cuero anilina premium",
    rotacion: "	360° silenciosa y suave",
    garantia: "10 años en estructura",
    imagenes: [
      "img/sillon_copacabana.png"
    ]
  }

];

// ==========================================
// 4. PRODUCT CATALOG FUNCTIONALITY
// ==========================================

/**
 * Initializes product catalog display for home and catalog pages
 * - Creates desktop grid layout for product cards
 * - Generates mobile carousel with indicators
 * - Only runs on pages that have the required containers
 * - Prevents duplication by clearing containers first
 */
function initProductos() {
    console.log('Inicializando productos');
    
    const productos = PRODUCTS.map(p => ({
    nombre: p.nombre,
    precio: `$${p.precio.toLocaleString("es-AR")}`,
    img: p.imagenes[0]
    }));


    // Contenedores - verificar que existan antes de usarlos
    const desktopContainer = document.getElementById("products-container");
    const carouselContainer = document.getElementById("products-carousel-container");
    const indicatorsContainer = document.getElementById("products-carousel-indicators");

    // Solo ejecutar si los contenedores existen
    if (!desktopContainer || !carouselContainer) {
        console.log('Contenedores de productos no encontrados en esta página');
        return;
    }

    // Verificar si ya están cargados para evitar duplicación
    if (desktopContainer.children.length > 0) {
        console.log('Productos ya cargados, evitando duplicación');
        return;
    }

    console.log('Contenedores de productos encontrados, cargando...');

    // Limpiar contenedores por seguridad
    desktopContainer.innerHTML = '';
    carouselContainer.innerHTML = '';
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
    }

    // Arrays para acumular el HTML
    let desktopHTML = '';
    let carouselHTML = '';
    let indicatorsHTML = '';

    productos.forEach((prod, index) => {
        // ----- Desktop grid -----
        desktopHTML += `
            <div class="col-md-3 col-sm-6">
                <article class="product-card text-center h-100">
                    <div class="product-image">
                        <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid">
                    </div>
                    <div class="product-info">
                        <h3 class="product-dest-title">${prod.nombre}</h3>
                        <p class="product-price">${prod.precio}</p>
                    </div>
                </article>
            </div>
        `;
        
        // ----- Mobile carousel -----
        carouselHTML += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <article class="product-card mx-auto text-center">
                    <div class="product-image">
                        <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid">
                    </div>
                    <div class="product-info">
                        <h3 class="product-dest-title">${prod.nombre}</h3>
                        <p class="product-price">${prod.precio}</p>
                    </div>
                </article>
            </div>
        `;

        // ----- Carousel indicators -----
        if (indicatorsContainer) {
            indicatorsHTML += `
                <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" 
                        class="${index === 0 ? 'active' : ''}" 
                        aria-current="${index === 0 ? 'true' : 'false'}" 
                        aria-label="Slide ${index + 1}"></button>
            `;
        }
    });

    // Asignar todo el HTML de una vez para evitar múltiples reflows
    desktopContainer.innerHTML = desktopHTML;
    carouselContainer.innerHTML = carouselHTML;
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = indicatorsHTML;
    }

    console.log('✅ Productos cargados correctamente:', productos.length, 'productos');
}

// ==========================================
// 5. CONTACT FORM FUNCTIONALITY
// ==========================================

/**
 * Initializes contact form validation and submission
 * - Handles form validation with Bootstrap classes
 * - Provides real-time input validation feedback
 * - Shows success message after valid submission
 * - Resets form state after successful submission
 */
function initContactForm() {
    console.log('Inicializando formulario de contacto');
    
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    // Solo ejecutar si el formulario existe (página de contacto)
    if (!form || !successMessage) {
        console.log('Formulario de contacto no encontrado en esta página');
        return;
    }

    console.log('✅ Formulario de contacto encontrado');

    form.addEventListener("submit", (event) => {
        console.log('Formulario enviado');
        event.preventDefault();
        event.stopPropagation();

        const isValid = form.checkValidity();
        form.classList.add('was-validated');

        console.log('Formulario válido:', isValid);

        if (isValid) {
            console.log('🎉 Mostrando mensaje de éxito');
            setTimeout(() => {
                successMessage.classList.remove("d-none");
                form.reset();
                form.classList.remove('was-validated');
                
                successMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 500);
        }
    });

    // Validación en tiempo real
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
    });

    console.log('Formulario de contacto inicializado correctamente');
}

// ==========================================
// 6. CAROUSEL ACCESSIBILITY ENHANCEMENT
// ==========================================

/**
 * Enhanced carousel accessibility features
 * - Manages aria-selected states for indicators
 * - Provides keyboard navigation for carousel indicators
 * - No live region announcements to avoid distracting screen reader users
 */
function initCarouselAccessibility() {
    console.log('Inicializando accesibilidad del carrusel');
    
    const carousel = document.getElementById('heroCarousel');
    
    if (!carousel) {
        console.log('Carrusel principal no encontrado en esta página');
        return;
    }
    
    // Listen for carousel slide events to update aria-selected only
    carousel.addEventListener('slid.bs.carousel', function(e) {
        const activeIndex = e.to;
        
        // Update aria-selected for indicators (silent update)
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
        });
        
        console.log('Carrusel cambió a diapositiva:', activeIndex + 1);
    });
    
    // Handle keyboard navigation for carousel indicators
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
            
            // Focus and click the new indicator
            indicators[newIndex].focus();
            indicators[newIndex].click();
        });
    });
    
}

// ==========================================
// 7. APPLICATION INITIALIZATION
// ==========================================

/**
 * Main application initialization function
 * - Coordinates initialization of all page components
 * - Attempts to initialize products, contact form, and carousel accessibility
 * - Called when DOM is ready or immediately if already loaded
 */
function initApp() {
    console.log('Inicializando aplicación');
    console.log('Document ready state:', document.readyState);
    
    // Intentar inicializar productos
    initProductos();
    
    // Intentar inicializar formulario de contacto
    initContactForm();
    
    // Intentar inicializar accesibilidad del carrusel
    initCarouselAccessibility();
    
    console.log('Inicialización completada');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    console.log('Esperando DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    console.log('DOM ya está listo, ejecutando inmediatamente');
    initApp();
}

// Backup: ejecutar también en window.load
window.addEventListener('load', function() {
    console.log('🔄 Window load disparado');
    // Solo como backup si no se ejecutó antes
    if (!window.appInitialized) {
        initApp();
        window.appInitialized = true;
    }
});

// ==========================================
// 7. PRODUCT PAGE LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product");
  if (!container) return; // solo corre en producto.html

  const params = new URLSearchParams(location.search);
  const productId = params.get("id");

  const p = PRODUCTS.find(x => x.id === productId);


  if (!p) {
    container.innerHTML = `
      <h2>Producto no encontrado</h2>
      <p><a href="productos.html">Volver al catálogo</a></p>
    `;
    return;
  }

  // ====== Título + Carrusel + Detalle ======
  const carouselId = "productGallery";
  const imgs = (p.imagenes && p.imagenes.length ? p.imagenes : ['img/producto-ejemplo.jpg']);

  const slides = imgs.map((src, i) => `
    <div class="carousel-item ${i===0 ? 'active':''}">
      <img src="${src}" class="d-block w-100" alt="${p.nombre} ${i+1}">
    </div>
  `).join("");

  const indicators = imgs.map((_, i) => `
    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}" class="${i===0?'active':''}" aria-label="Slide ${i+1}"></button>
  `).join("");

  container.innerHTML = `
    <h1 class="product-title">${p.nombre}</h1>

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

      <!-- Thumbs -->
      <div class="product-thumbs">
        ${imgs.map((src, i)=>`<img src="${src}" data-idx="${i}" class="${i===0?'active':''}" alt="Thumb ${i+1}">`).join("")}
      </div>
    </section>

    <section class="product-detail">
      <div class="row g-4">
        <div class="col-lg-7">
          ${p.descripcion ? `<p class="product-desc">${p.descripcion}</p>` : ""}
          <ul class="product-specs">
            ${p.medidas ? `<li><strong>Medidas:</strong> ${p.medidas}</li>` : ""}
            ${p.materiales ? `<li><strong>Materiales:</strong> ${p.materiales}</li>` : ""}
            ${p.acabado ? `<li><strong>Acabado:</strong> ${p.acabado}</li>` : ""}
          </ul>
        </div>
        <div class="col-lg-5">
          <div class="purchase-card">
            <div class="price">$ ${Number(p.precio || 0).toLocaleString("es-AR")}</div>
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

  // ====== Carrusel: thumbnails + flechas ======
  const thumbBar = container.querySelector(".product-thumbs");
  const carouselEl = container.querySelector("#" + carouselId);

  function activateSlideManually(idx){
    const items = carouselEl.querySelectorAll(".carousel-item");
    items.forEach((it,i)=>it.classList.toggle("active", i===idx));
    const indBtns = carouselEl.querySelectorAll(".carousel-indicators [data-bs-slide-to]");
    indBtns.forEach((b,i)=>b.classList.toggle("active", i===idx));
    thumbBar?.querySelectorAll("img").forEach((t,i)=>t.classList.toggle("active", i===idx));
  }

  let bsCarousel = null;
  if (carouselEl && window.bootstrap && window.bootstrap.Carousel){
    bsCarousel = new bootstrap.Carousel(carouselEl, { interval: false, ride: false });
    carouselEl.addEventListener("slid.bs.carousel", (e)=>{
      const idx = e.to;
      thumbBar?.querySelectorAll("img").forEach((t,i)=>{
        t.classList.toggle("active", i===idx);
      });
    });
  }

  thumbBar?.querySelectorAll("img").forEach(img=>{
    img.addEventListener("click", ()=>{
      const idx = parseInt(img.getAttribute("data-idx"), 10);
      if (bsCarousel){ bsCarousel.to(idx); } else { activateSlideManually(idx); }
    });
  });

  if (!bsCarousel && carouselEl){
    const prev = carouselEl.querySelector(".carousel-control-prev");
    const next = carouselEl.querySelector(".carousel-control-next");
    const items = carouselEl.querySelectorAll(".carousel-item");
    let current = [...items].findIndex(it => it.classList.contains("active"));
    if (current < 0) current = 0;

    function goTo(i){
      if (i < 0) i = items.length - 1;
      if (i >= items.length) i = 0;
      current = i;
      activateSlideManually(current);
    }
    prev?.addEventListener("click", (e)=>{ e.preventDefault(); goTo(current - 1); });
    next?.addEventListener("click", (e)=>{ e.preventDefault(); goTo(current + 1); });
  }

  // ==========================================
  // 8. ADD TO CART FUNCTIONALITY
  // ==========================================
  const addBtn = document.getElementById("addToCartBtn");
  addBtn?.addEventListener("click", () => {
    let qty = parseInt(document.getElementById("qty").value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > 99) qty = 99;

    const badge = document.querySelector(".elbadge");
    if (badge) {
      const n = parseInt(badge.textContent, 10) || 0;
      badge.textContent = n + qty;
    }
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const item = cart.find(i => i.id === p.id);
      if (item) item.qty += qty; else cart.push({ id: p.id, qty });
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch(e) {}
    alert(`Se añadieron ${qty} unidad(es) de "${p.nombre}" al carrito.`);
  });
});