//cuando se muestre el dom necesito que se muestren los productos del cart, botón compra y mail
document.addEventListener("DOMContentLoaded", function () {
  displayCartProducts();
  document.getElementById("checkout-button").addEventListener("click", checkout);
  document.getElementById("emailInput").addEventListener("input", validateEmailInput);
});

let totalPrice = 0;

function validateEmailInput() {
  const emailInput = document.getElementById("emailInput");
  const checkoutButton = document.getElementById("checkout-button");
  const email = emailInput.value.trim();

  if (validateEmail(email)) {
      checkoutButton.disabled = false;
  } else {
      checkoutButton.disabled = true;
  }
}

// productos del carrito
function displayCartProducts() {
  const containerProductsCarts = document.getElementById("containerProductsCarts");
  containerProductsCarts.innerHTML = "";

  const savedCart = localStorage.getItem("shoppingCart");
  const cartProducts = savedCart ? JSON.parse(savedCart) : [];

  totalPrice = 0;
  if (cartProducts.length === 0) {
      containerProductsCarts.textContent = "No hay elementos en el carrito.";
  } else {
      cartProducts.forEach((product) => {
          const productElement = document.createElement("div");
          productElement.className = "productCartItem card mb-3";

          const imgElement = document.createElement("img");
          imgElement.src = `.${product.img}`;
          imgElement.alt = product.name;
          imgElement.className = "imgcart";

          const nameElement = document.createElement("h6");
          nameElement.textContent = product.name;

          const priceElement = document.createElement("span");
          priceElement.textContent = `$${product.price}`;

          totalPrice += product.price;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Eliminar";
          deleteButton.className = "deleteButton";
          deleteButton.addEventListener("click", () => {
              const productId = product.id;
              const productIndex = cartProducts.findIndex(
                  (item) => item.id === productId
              );
              if (productIndex !== -1) {
                  cartProducts.splice(productIndex, 1);
                  localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));
                  totalPrice -= product.price;
                  productElement.remove();
                  shoppingCart.loadCartFromLocalStorage();
                  shoppingCart.updateCartCount();
                  if (cartProducts.length === 0) {
                      containerProductsCarts.textContent =
                          "No hay elementos en el carrito. Vuelve a la página principal para seguir comprando.";
                  }
                  const cartTotalElement = document.getElementById("cart-total");
                  if (cartTotalElement) {
                      cartTotalElement.textContent = `$${totalPrice}`;
                  }
              }
          });

          productElement.appendChild(imgElement);
          productElement.appendChild(nameElement);
          productElement.appendChild(priceElement);
          productElement.appendChild(deleteButton);

          containerProductsCarts.appendChild(productElement);
      });
  }

  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
      cartTotalElement.textContent = `$${totalPrice}`;
  }
}
// Uso de libreria para confirmar la compra
function checkout() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "¿Estás seguro de finalizar la compra?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "¡Continuar Compra!",
    cancelButtonText: "¡Cancelar Compra!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "¡Compra realizada con éxito!",
        text: `Su total es de $ ${totalPrice}. Te enviamos a tu casilla de correo electrónico ${email} los medios de pagos para abonar el total de productos que compraste en Noyack. ¡Gracias por tu compra!`,
        icon: "success",
        confirmButtonText: "Aceptar"
      }).then(() => {
        localStorage.clear();
        location.reload();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Compra Cancelada",
        text: "Tu compra ha sido cancelada.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    }
  });
}

// te pide @si o si para el mail
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
