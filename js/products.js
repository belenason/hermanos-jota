// products.js
// Array de objetos que representa el catálogo de Hermanos Jota

const PRODUCTS = [
  {
    id: "01",
    nombre: "Aparador Uspallata",
    precio: 80.00,
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    medidas: "180 × 45 × 75 cm",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    acabado: "Aceite natural ecológico",
    imagenes: [
      "img/aparador_uspallata.png",
   //imagenes extra solo para probar el carrusel
      "img/sillas_cordoba.png",
      "img/sillon_copacabana.png"
 
    ]
  },
  {
    id: "02",
    nombre: "Biblioteca Recoleta",
    precio: 0,
    descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    medidas: "100 × 35 × 200 cm",
    materiales: "Estructura de acero, estantes de roble",
    acabado: "Laca mate ecológica",
    capacidad: "45 kg por estante",
    modulares: "5 estantes ajustables",
    imagenes: [
      "img/biblioteca_recoleta.png"
    ]
  }
  //faltan agregar todos los productos!!
];

// Función para simular una carga asíncrona (como si viniera de un servidor)
function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PRODUCTS), 300); // 300ms de delay simulado
  });
}

// Función para buscar un producto por id
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
