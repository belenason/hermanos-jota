(function () {
  const navbar = document.querySelector(".custom-navbar");
  const collapse = document.querySelector(".navbar-collapse");
  if (!navbar) return;

  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  function applyNavbarState() {
    if (!isDesktop()) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
      return;
    }

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");
    }
  }

  document.addEventListener("DOMContentLoaded", applyNavbarState);
  window.addEventListener("scroll", applyNavbarState, { passive: true });
  window.addEventListener("resize", applyNavbarState);

  // Cuando se abre el menú colapsado en móviles, fondo sólido sí o sí
  if (collapse) {
    collapse.addEventListener("show.bs.collapse", () => {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    });
    collapse.addEventListener("hide.bs.collapse", applyNavbarState);
  }
})();



//logica de producto.html - no se si esta bien 
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
    alert(`Se añadieron ${qty} unidad(es) de "${p.nombre}" al carrito.`);
  });
});


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



const productos = [
    { nombre: "Silla Belgrano", precio: "$2.000", img: "img/silla_de_trabajo_belgrano.png" },
    { nombre: "Mesa Araucaria", precio: "$2.000", img: "img/mesa_de_centro_araucaria.png" },
    { nombre: "Mesa Aconcagua", precio: "$2.000", img: "img/mesa_de_noche_aconcagua.png" },
    { nombre: "Aparador Uspallata", precio: "$2.000", img: "img/aparador_uspallata.png" }
  ];

  // Contenedores
  const desktopContainer = document.getElementById("products-container");
  const carouselContainer = document.getElementById("products-carousel-container");
  const indicatorsContainer = document.getElementById("products-carousel-indicators");

  productos.forEach((prod, index) => {
    // ----- Desktop grid -----
  desktopContainer.innerHTML += `
    <div class="col-md-3 col-sm-6">
      <article class="product-card text-center h-100">
        <div class="product-image">
          <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid">
        </div>
        <div class="product-info">
          <h3 class="product-title">${prod.nombre}</h3>
          <p class="product-price">${prod.precio}</p>
        </div>
      </article>
    </div>
  `;


    // ----- Mobile carousel -----
    carouselContainer.innerHTML += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <article class="product-card mx-auto text-center">
          <div class="product-image">
            <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid">
          </div>
          <div class="product-info">
            <h3 class="product-title">${prod.nombre}</h3>
            <p class="product-price">${prod.precio}</p>
          </div>
        </article>
      </div>
    `;

    indicatorsContainer.innerHTML += `
      <button type="button" data-bs-target="#productCarousel" 
              data-bs-slide-to="${index}" 
              class="${index === 0 ? "active" : ""}" 
              aria-current="${index === 0 ? "true" : "false"}" 
              aria-label="Slide ${index + 1}">
      </button>
    `;
  });