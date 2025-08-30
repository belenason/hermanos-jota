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
  },
  {
    id: "03",
    nombre: "Butaca Mendoza",
    precio: 0,
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    medidas: "80 × 75 × 85 cm",
    materiales: "Guatambú macizo, tela bouclé",
    acabado: "Cera vegetal, tapizado premium",
    tapizado:"Repelente al agua y manchas" ,
    confort:"Espuma alta densidad", 
    imagenes: [
      "img/butaca_mendoza.png"
    ]
  },
  {
    id: "04",
    nombre: "Sillón Copacabana",
    precio: 0,
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    medidas: "90 × 85 × 95 cm",
    materiales: "Cuero curtido vegetal, acero pintado",
    acabado: "Cuero anilina premium",
    rotacion:"360° silenciosa y suave" ,
    garantia:"10 años en estructura", 
    imagenes: [
      "img/butaca_mendoza.png"
    ]
  }
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
