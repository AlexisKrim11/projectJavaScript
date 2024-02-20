document.addEventListener("DOMContentLoaded", function () {
  displayCartProducts();
  document
    .getElementById("checkout-button")
    .addEventListener("click", checkout);
  document
    .getElementById("emailInput")
    .addEventListener("input", validateEmailInput);
});

let totalPrice = 0;

function validateEmailInput() {
  const emailInput = document.getElementById("emailInput");
  const checkoutButton = document.getElementById("checkout-button");
  const email = emailInput.value.trim();

  // Habilitar el botón si se ingresa un correo electrónico válido, deshabilitarlo de lo contrario
  if (validateEmail(email)) {
    checkoutButton.disabled = false;
  } else {
    checkoutButton.disabled = true;
  }
}


function displayCartProducts() {
  const containerProductsCarts = document.getElementById(
    "containerProductsCarts"
  );
  containerProductsCarts.innerHTML = "";

  // Obtener productos del carrito desde el almacenamiento local
  const savedCart = localStorage.getItem("shoppingCart");
  const cartProducts = savedCart ? JSON.parse(savedCart) : [];

  // Mostrar productos del carrito en la página
  totalPrice = 0; // Variable para calcular el total del carrito
  if (cartProducts.length === 0) {
    containerProductsCarts.textContent = "No hay elementos en el carrito.";
  } else {
    cartProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "productCartItem card mb-3";

      // Crear elementos HTML para mostrar información del producto
      const imgElement = document.createElement("img");
      imgElement.src = `.${product.img}`;
      imgElement.alt = product.name;
      imgElement.className = "imgcart";

      const nameElement = document.createElement("h6");
      nameElement.textContent = product.name;

      const priceElement = document.createElement("span");
      priceElement.textContent = `$${product.price}`;

      // Agregar el precio del producto al total del carrito
      totalPrice += product.price;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.className = "deleteButton";
      deleteButton.addEventListener("click", () => {
        // Obtener el ID del producto que se va a eliminar
        const productId = product.id;

        // Encontrar el índice del producto en el arreglo del carrito
        const productIndex = cartProducts.findIndex(
          (item) => item.id === productId
        );

        // Verificar si se encontró el producto
        if (productIndex !== -1) {
          // Eliminar el producto del arreglo del carrito
          cartProducts.splice(productIndex, 1);
          // Actualizar la información en el almacenamiento local (local storage)
          localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));

          // Recalcular el total del carrito
          totalPrice -= product.price;

          // Remover el elemento del DOM
          productElement.remove();
          // actualizar contador
          shoppingCart.loadCartFromLocalStorage();
          shoppingCart.updateCartCount();

          // Actualizar el mensaje si el carrito está vacío
          if (cartProducts.length === 0) {
            containerProductsCarts.textContent =
              "No hay elementos en el carrito. Vuelve a la página principal para seguir comprando.";
          }

          // Actualizar el total del carrito en el elemento HTML correspondiente
          const cartTotalElement = document.getElementById("cart-total");
          if (cartTotalElement) {
            cartTotalElement.textContent = `$${totalPrice}`;
          }
        }
      });
      // Agregar elementos al contenedor del producto
      productElement.appendChild(imgElement);
      productElement.appendChild(nameElement);
      productElement.appendChild(priceElement);
      productElement.appendChild(deleteButton);

      // Agregar el contenedor del producto al contenedor principal del carrito
      containerProductsCarts.appendChild(productElement);
    });
  }

  // Mostrar el total del carrito
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${totalPrice}`;
  }
}

function checkout() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  // Validar el correo electrónico
  if (!validateEmail(email)) {
    alert("Por favor ingrese una dirección de correo electrónico válida.");
    return;
  }

  // Si el correo electrónico es válido, mostrar el mensaje de compra

  const confirmationMessage = `Su total es de $ ${totalPrice} Te enviamos a tu casilla de correo electrónico ${email} los medios de pagos para abonar el total de productos que compraste en Noyack. ¡Gracias por tu compra!`;
  alert(confirmationMessage);


  // Limpiar el almacenamiento local
  localStorage.clear();

  // Reiniciar la página
  location.reload();
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
