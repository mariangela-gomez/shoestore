// Catálogo de respaldo: se muestra siempre y la web funciona
// aunque el backend o la base de datos no estén disponibles.
const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const products = [
  {
    _id: "local-1",
    name: "Velocity Red",
    category: "running",
    price: "129",
    image: img("1542291026-7eec264c27ff"),
    description:
      "Upper de malla elástica tipo calcetín y suela de espuma ligera para rodar kilómetros sin pensar en los pies.",
  },
  {
    _id: "local-2",
    name: "Aero Max Sunset",
    category: "lifestyle",
    price: "149",
    image: img("1514989940723-e8e51635b782"),
    description:
      "Cámara de aire visible, ante premium y colores atrevidos. La zapatilla que se ve desde la otra acera.",
  },
  {
    _id: "local-3",
    name: "Court Mid Noir",
    category: "basketball",
    price: "139",
    image: img("1597045566677-8cf032ed6634"),
    description:
      "Caña media con sujeción de tobillo y amortiguación reactiva para saltos y cambios de dirección.",
  },
  {
    _id: "local-4",
    name: "Cloud Runner",
    category: "running",
    price: "119",
    image: img("1460353581641-37baddab0fa2"),
    description:
      "Ligera, transpirable y con cámara de aire en el talón. Perfecta para tus rodajes diarios.",
  },
  {
    _id: "local-5",
    name: "Volt Trainer",
    category: "training",
    price: "99",
    image: img("1606107557195-0e29a4b5b4aa"),
    description:
      "Base estable y agarre total para levantar, saltar y entrenar a alta intensidad.",
  },
  {
    _id: "local-6",
    name: "Street Low Bred",
    category: "lifestyle",
    price: "109",
    image: img("1552346154-21d32810aba3"),
    description:
      "Silueta clásica de perfil bajo en rojo y negro. Combina con todo y nunca pasa de moda.",
  },
  {
    _id: "local-7",
    name: "Kyoto Mid Court",
    category: "basketball",
    price: "159",
    image: img("1605348532760-6753d2c43329"),
    description:
      "Suela con dientes para frenar en seco y mediasuela firme. Diseñada para dominar la cancha.",
  },
  {
    _id: "local-8",
    name: "Air Force Cloud",
    category: "lifestyle",
    price: "119",
    image: img("1579338559194-a162d19bf842"),
    description:
      "Piel blanca con detalles en negro y rojo. Comodidad todo el día con aire en la suela.",
  },
  {
    _id: "local-9",
    name: "Pastel Shadow",
    category: "lifestyle",
    price: "129",
    image: img("1595950653106-6c9ebd614d3a"),
    description:
      "Paneles superpuestos en tonos pastel. Edición limitada para quien quiere destacar.",
  },
  {
    _id: "local-10",
    name: "Terra Camel",
    category: "lifestyle",
    price: "135",
    image: img("1549298916-b41d501d3772"),
    description:
      "Lona resistente con forro de borrego y suela de goma crema. Estilo urbano para días frescos.",
  },
  {
    _id: "local-11",
    name: "Orange Pulse",
    category: "running",
    price: "125",
    image: img("1600185365926-3a2ce3cdb9eb"),
    description:
      "Amortiguación con cámara de aire y degradado naranja. Velocidad que se nota y se ve.",
  },
  {
    _id: "local-12",
    name: "Phantom Flight",
    category: "training",
    price: "95",
    image: img("1491553895911-0055eca6402d"),
    description:
      "Peso pluma, ajuste preciso y suela flexible para circuitos, cardio y gimnasio.",
  },
  {
    _id: "local-13",
    name: "Orbit Mid Fire",
    category: "basketball",
    price: "145",
    image: img("1608231387042-66d1773070a5"),
    description:
      "Caña media en rojo, negro y blanco con cuero premium y gran soporte lateral.",
  },
  {
    _id: "local-14",
    name: "Pure White Classic",
    category: "lifestyle",
    price: "89",
    image: img("1587563871167-1ee9c731aefb"),
    description:
      "Minimalista, blanca y versátil. El básico que siempre querrás tener en tu armario.",
  },
];

export default products;
