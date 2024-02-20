// Productos
const products = [
    {id: 1, name: "Remera HP - Mapa del merodeador",  category: "textil", price :9000, stock: 16, img: "./assets/HP Mapa merodeador RB.jpg" },
    {id: 2, name: "Remera Los Simpsons - Homero duerme",  category: "textil", price :7500, stock: 20, img: "./assets/Homero duerme RB.jpg"},
    {id: 3, name: "Remera Naruto - Stencil",  category: "textil", price :9000, stock: 6,  img: "./assets/Naruto Stencil RG.jpg"},
    {id: 4, name: "Remera Greys Anatomy - Dance it out", category: "textil", price : 7500, stock: 15,  img: "./assets/GREYS DANCE IT OUT  RB.jpg"},
    {id: 5, name: "Body para bebé personalizado", category: "textil", price: 5000, stock: 3,  img: "./assets/1 año bebe en pañales.jpg"},
    {id: 6, name: "Remera Naruto - Logo Akatski", category: "textil", price: 7000, stock: 17,  img: "./assets/naruto 2.jpg"},
    {id: 7, name: "Remera 9 ¾ - Harry Potter - Oficial", category: "textil", price: 8000, stock: 26,  img: "./assets/HP 9 3,4 RG.jpg"},
    {id: 8, name: "Remera Dragon Ball Z - Oficial", category: "textil", price: 9000, stock: 22,  img: "./assets/Dragon Ball 1 RB.jpg"},
    {id: 9, name: "Jarro térmico - Arbol de la vida  ", category: "plasticos", price: 7000, stock: 30,  img: "./assets/Frases.jpg"},
    {id: 10, name: "Taza para madre primeriza", category: "plasticos", price: 6000, stock: 25,  img: "./assets/Madre primeriza JT.jpg"},
    {id: 11, name: "Jarro térmico - Stich para cumpleaños", category: "plasticos", price: 7000, stock: 30,  img: "./assets/stich para cumpleaños.jpg"},
    {id: 12, name: "Jarro térmico personalizado ", category: "plasticos", price: 7000, stock: 30,  img: "./assets/personalizado.jpg"},
    {id: 13, name: "Remera Toy Story - Personajes", category: "textil", price: 7500, stock: 100, img: "./assets/Toy Story 7.jpg"},
    {id: 14, name: "Almohadón Harry Potter", category: "textil", price: 10000, stock: 5, img: "./assets/HP Rayo Almohadon.jpg"},
    {id: 15, name: "Body para anuncio de padres", category: "textil", price: 5000, stock: 4, img: "./assets/y ahora el amor se multiplica B.jpg"},
    {id: 16, name: "Remera Minnie - Talles niños", category: "textil", price: 6500, stock: 40, img: "./assets/mickey bebé RB.jpg"},

];

//Local Storage de productos

const saveProductsLS = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const getProductsLS = () => {
  const productsJSON = localStorage.getItem("products");
  return productsJSON ? JSON.parse(productsJSON) : [];
};

getProductsLS(products);

// Mostrar todos los productos al cargar la página
document.addEventListener("allProducts", function () {
  displayAllProducts();
});

// Función para mostrar productos
function displayProducts(productsToShow) {
  let containerProducts = document.getElementById("containerProducts");
  containerProducts.innerHTML = "";

  for (const product of productsToShow) {
    let element = document.createElement("div");
    element.className = "card";
    element.style.width = "18rem";
    element.innerHTML = `<div class="card border-0">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body text-center">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-text"><b>$${product.price}</b></h6>
                <a class="btn btn-primary addToCart" id="${product.id}">Agregar al carrito</a>
                <p class="card-text">Efectivo por el local 20% de descuento <br>Débito sin interés</p>
                </a>
            </div>
        </div>`;
    containerProducts.appendChild(element);
  }

  // Agregar evento de clic a los botones "Agregar al carrito"
  const addToCartButtons = document.getElementsByClassName("addToCart");
  for (const button of addToCartButtons) {
    button.addEventListener("click", function (event) {
      const productId = event.target.id;
      shoppingCart.addProducts(productId);
    });
  }
}

// Función para mostrar todos los productos al cargar la página
function displayAllProducts() {
  displayProducts(products);
}

// Función para plasticos, textil y todos los productos
function filterProducts(category) {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  displayProducts(filteredProducts);
}

// Control de clic para el filtro de productos
document.getElementById("textilButton").addEventListener("click", function () {
  filterProducts("textil");
});

document
  .getElementById("plasticosButton")
  .addEventListener("click", function () {
    filterProducts("plasticos");
  });

document.getElementById("allButton").addEventListener("click", function () {
  displayAllProducts();
});

class ShoppingCart {
  constructor() {
    this.loadCartFromLocalStorage(); // Cargar el carrito desde el almacenamiento local al crear la instancia
    this.updateCartCount(); // Actualizar el contador de productos en el carrito al crear la instancia
  }
  //añadir producto al constructor
  addProducts(id) {
    const productToAdd = products.find(
      (product) => product.id === parseInt(id)
    );
    if (productToAdd) {
      this.products.push(productToAdd);
      console.log(`Se agregó el producto ${productToAdd.name} al carrito.`);
      this.saveCartToLocalStorage(); // Guardar el carrito en el almacenamiento local después de agregar un producto
      this.updateCartCount(); // Actualizar el contador de productos en el carrito
    } else {
      console.log(`No se encontró ningún producto con el ID ${id}.`);
    }
  }
  //guardar en LS productos
  saveCartToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  }
  //convertir JSON
  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("shoppingCart");
    this.products = savedCart ? JSON.parse(savedCart) : [];
  }
  //contador badge
  updateCartCount() {
    const count = this.products.length;
    console.log(`Cantidad de productos en el carrito: ${count}`);
    const totalCartElement = document.getElementById("totalCart");
    if (totalCartElement) {
      // Verificar si el elemento del contador existe en la página actual
      totalCartElement.textContent = count;
    }
  }
}

// Creo instancia de ShoppingCart
const shoppingCart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", function () {
  // Cargar productos desde el Local Storage
  const savedProducts = getProductsLS();
  if (savedProducts.length > 0) {
    productsLS = savedProducts;
  }
  displayAllProducts();
});

function addToCartClickHandler(event) {
  const productId = event.target.id;
  shoppingCart.addProducts(productId);
}
