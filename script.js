
class ShoppingCart {
    constructor() {
        this.products = [];
        this.paymentMethod = [];
        this.total = 0;
    }
    
    // Método para agregar productos al carrito
    addProducts(id) {
        let product = products.find(prod => prod.id === id);
        if (product) {
            this.products.push(product);
            console.log("Se agregó #" + id + " al Carrito!");
        } else {
            console.log("No se encontró el Producto #" + id + "!");
        }
    }

    // Método para listar los productos en el carrito
    listShoppingCart() {
        let output = "";
        this.products.forEach(item => {
            output += item.id + " - " + item.name + " - $" + item.price + "\n";
        });
        return output;
    }

    // Método para calcular el total a pagar
    calculateTotalPay() {
        let total = 0;
        this.products.forEach(item => {
            total += item.price;
        });
        return total;
    }

    // Método para gestionar los métodos de pago con interés
    interestPaymentMethods(id) {
        let payment = paymentMethods.find(pay => pay.ID === id);
        if (payment) {
            this.paymentMethod.push(payment);
            console.log("Vas a pagar con el método de pago #" + id + " con un interés de " + payment.interest);
        } else {
            console.log("Medio de pago inexistente #" + id);
        }
    }

    // Método para aplicar el interés sobre el total a pagar
    // Método para aplicar el interés sobre el total a pagar y obtener el tipo de medio de pago
    applyInterest() {
        let interest = 0;
        let paymentType = '';

        if (this.paymentMethod.length > 0) { 
            interest = this.paymentMethod[0].interest; 
            paymentType = this.paymentMethod[0].name;
        }

        let totalWithInterest = Math.round((this.calculateTotalPay() * interest));
        return { totalWithInterest, paymentType };
    }

    // Método para mostrar los productos disponibles para agregar al carrito
    displayProducts() {
        let display = "";
        products.forEach(item => {
            display += item.id + " - " + item.name + " - $" + item.price + "\n";
        });
        return display;
    }
}

// Bienvenida
let userName = prompt("¡Bienvenido/a Noyack Sublimaciones! Por favor, ingrese su nombre para poder atenderlo ");
alert("Gracias por visitarnos " + userName);
console.log("Gracias por visitarnos " + userName);

let password = parseInt(prompt(userName + ", necesitamos corroborar que no eres un robot. Ingresa un código de 4 números que te pediremos a continuación "));

// Verificar que no es un robot
for (let attempts = 3; attempts >= 0; attempts--) {
    let passwordEntered = parseInt(prompt("Ingrese su código de 4 dígitos, actualmente tiene " + attempts + " intentos"));
    if (passwordEntered === password) {
        alert("Has ingresado correctamente a nuestro sistema para poder realizar compras");
        console.log("Ingreso correcto");
        break;
    } else if (attempts > 0) {
        alert("Código incorrecto");
        console.log("Código incorrecto");
    } else {
        alert ("Actualice la página para poder comprar e intente nuevamente")
        console.log ("Actualizar página código incorrecto")
    }
}

// Productos
const products = [
    {id: 1, name: "Remera Harry Potter - Mapa del merodeador",  category: "remeras", price :9000, stock: 16},
    {id: 2, name: "Remera Los Simpsons - Homero duerme",  category: "remeras", price :7500, stock: 20},
    {id: 3, name: "Remera Naruto - Stencil",  category: "remeras", price :9000, stock: 6},
    {id: 4, name: "Remera Greys Anatomy - Dance it out", category: "remeras", price : 7500, stock: 15},
    {id: 5, name: "Body para bebé personalizado", category: "bodys", price: 5000, stock: 3},
];

// Medios de pago e interés
const paymentMethods = [
    { ID: 1 ,name: "Tarjeta de crédito", interest: 1.36 },
    { ID: 2, name: "Tarjeta de débito", interest: 1 },
    { ID: 3, name: "Efectivo", interest: 0.80 },
    { ID: 4, name: "Transferencia bancaria", interest: 1.10 },
];

const shoppingCart = new ShoppingCart(); // Instancia del carrito

let selectedOption = 10; // Inicializar la opción seleccionada con un valor diferente de cero

while (selectedOption !== 0) {
    selectedOption = parseInt(prompt("Seleccione el producto a agregar al Carrito: (0 para Salir)\n\n" + shoppingCart.displayProducts()));

    if (selectedOption === 0) {
        break; // Salir del bucle si la opción seleccionada es cero
    }

    shoppingCart.addProducts(selectedOption); // Agregar el producto al carrito
}

// Selección del medio de pago
let paymentOption = parseInt(prompt("Seleccione el medio de pago:\n\n1. Tarjeta de crédito +36% \n2. Tarjeta de débito s/interés \n3. Efectivo 20% OFF\n4. Transferencia bancaria + 10%"));

shoppingCart.interestPaymentMethods(paymentOption); // Agregar el medio de pago al carrito

// Detalle de los productos en el carrito
let cartDetails = "Detalle:\n" + shoppingCart.listShoppingCart();
// Subtotal de la compra
let subtotalOutput = "Subtotal: $" + shoppingCart.calculateTotalPay();  
// Monto final a pagar con interés aplicado
let finalAmountInfo = shoppingCart.applyInterest();
let finalAmount = "Tu total queda en $" + finalAmountInfo.totalWithInterest + " porque pagaste con " + finalAmountInfo.paymentType;


// Mostrar el resumen de la compra al usuario
alert(cartDetails + "\n" + subtotalOutput + "\n " + finalAmount);

