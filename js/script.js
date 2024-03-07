 //Declaro variable para mostrar los productos
let productsToShow = [];

// guardar productos LS
const saveProductsLS = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

// obtener productos de LS
const getProductsLS = () => {
  const productsJSON = localStorage.getItem("products");
  return productsJSON ? JSON.parse(productsJSON) : [];
};

// cuando se cargue la página me muestre todos los productos
document.addEventListener("DOMContentLoaded", function () {
  displayAllProducts();
});

// cambio fetch para que saque los products del json
async function displayAllProducts() {
  try {
    const respuesta = await fetch("./product.json");
    const data = await respuesta.json();
    productsToShow = data; // Asignar los productos a la variable global
    displayProducts(productsToShow);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

//funcion para las cards y mostrarlas
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

  const addToCartButtons = document.getElementsByClassName("addToCart");
  for (const button of addToCartButtons) {
    button.addEventListener("click", function (event) {
      const productId = event.target.id;
      shoppingCart.addProducts(productId);
    });
  }
}

// filtrar con el boton del menù por categoria
function filterProducts(category) {
  const filteredProducts = productsToShow.filter(
    (product) => product.category === category
  );
  displayProducts(filteredProducts);
}

document.getElementById("textilButton").addEventListener("click", function () {
  filterProducts("textil");
});

document.getElementById("plasticosButton").addEventListener("click", function () {
    filterProducts("plasticos");
  });

document.getElementById("allButton").addEventListener("click", function () {
  displayAllProducts();
});

// class para el carrito 

class ShoppingCart {
  constructor() {
    this.loadCartFromLocalStorage();
    this.updateCartCount();
  }

  addProducts(id) {
    const productToAdd = productsToShow.find(
      (product) => product.id === parseInt(id)
    );
    if (productToAdd) {
      this.products.push(productToAdd);
      console.log(`Se agregó el producto ${productToAdd.name} al carrito.`);
      this.saveCartToLocalStorage();
      this.updateCartCount();
    } else {
      console.log(`No se encontró ningún producto con el ID ${id}.`);
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  }

  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("shoppingCart");
    this.products = savedCart ? JSON.parse(savedCart) : [];
  }

  updateCartCount() {
    const count = this.products.length;
    console.log(`Cantidad de productos en el carrito: ${count}`);
    const totalCartElement = document.getElementById("totalCart");
    if (totalCartElement) {
      totalCartElement.textContent = count;
    }
  }
}

const shoppingCart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", function () {
  const savedProducts = getProductsLS();
  if (savedProducts.length > 0) {
    productsLS = savedProducts;
  }
  displayAllProducts();
});
