// Función para mostrar los productos del carrito
function displayCartProducts() {
  const containerProductsCarts = document.getElementById("containerProductsCarts");
  containerProductsCarts.innerHTML = "";

  // Obtener los productos del carrito del Local Storage
  const savedCart = localStorage.getItem("shoppingCart");
  const cartProducts = savedCart ? JSON.parse(savedCart) : [];

  let totalPrice = 0; // Inicializar el precio total a 0

  // Iterar sobre cada producto en el carrito
  cartProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "productCartItem card mb-3";

      // Crear elemento de imagen
      const imgElement = document.createElement("img");
      imgElement.src = `.${product.img}`;
      imgElement.alt = product.name;
      imgElement.className = "imgcart";

      // Crear elemento de nombre
      const nameElement = document.createElement("h6");
      nameElement.textContent = product.name;

      // Crear elemento de precio
      const priceElement = document.createElement("span");
      priceElement.textContent = `$${product.price}`;

      // Actualizar el precio total
      totalPrice += product.price;

      // Crear botón de eliminar
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
              displayCartProducts(); // Actualizar la vista del carrito después de eliminar un producto
          }
      });

      // Agregar elementos al contenedor de productos del carrito
      productElement.appendChild(imgElement);
      productElement.appendChild(nameElement);
      productElement.appendChild(priceElement);
      productElement.appendChild(deleteButton);

      containerProductsCarts.appendChild(productElement);
  });

  // Actualizar el precio total mostrado
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
      cartTotalElement.textContent = `$${totalPrice}`;
  }

  // Actualizar el contador del carrito
  const totalCartElement = document.getElementById("totalCart");
  if (totalCartElement) {
    totalCartElement.textContent = cartProducts.length;
  }
}

// Uso de librería para confirmar la compra
function checkout() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  // Obtener el precio total actualizado
  const totalPrice = parseFloat(document.getElementById("cart-total").textContent.replace("$", ""));

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

// Función para validar el correo electrónico
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para validar el input de correo electrónico
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

// Event Listener para cargar el DOM antes de mostrar los productos del carrito
document.addEventListener("DOMContentLoaded", function () {
  displayCartProducts();
  document.getElementById("checkout-button").addEventListener("click", checkout);
  document.getElementById("emailInput").addEventListener("input", validateEmailInput);
});
