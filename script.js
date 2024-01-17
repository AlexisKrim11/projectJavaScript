let precioRemera = 7500;
let precioTaza = 4500;
let stockDisponible = 5;

let userName = prompt("¡Bienvenido/a Noyack Sublimaciones! Le pedimos por favor su nombre para poder atenderlo ");

alert("Gracias por visitarnos " + userName);
console.log("Gracias por visitarnos " + userName);

let password = parseInt(prompt(userName + ", necesitamos corroborar que no eres un robot. Ingresa un código de 4 números que te pediremos a continuación "));

for (let intentos = 3; intentos >= 0; intentos--) {
    let passwordEntered = parseInt(prompt("Ingrese su código de 4 dígitos, actualmente tiene " + intentos + " intentos"));
    if (passwordEntered === password) {
        alert("Has ingresado correctamente a nuestro sistema para poder realizar compras");
        console.log("Ingreso correcto");
        break;
    } else if (intentos > 0) {
        alert("Código incorrecto");
        console.log("Código incorrecto");
    } else {
        alert ("Actualice la página para poder comprar e intente nuevamente")
        console.log ("Actualizar página código incorrecto")
    }

}



let tipoProducto = prompt("Elegí el producto que estás buscando: \n  Remera \n  Taza ");

switch (tipoProducto) {
    case "remera":
        alert("Has elegido comprar una remera ");
        console.log("Has elegido comprar una remera ");
        comprar();
        break;

    case "taza":
        alert("Has elegido comprar una taza ");
        console.log("Has elegido comprar una taza ");
        comprar();
        break;

    default:
        alert("Tipo de producto no válido (Escriba en minúsculas el nombre del producto). Actualice la página para seguir comprando.");
        console.log("Tipo de producto no válido (Escriba en minúsculas el nombre del producto). Actualice la página para seguir comprando.");
        
}

// Función para realizar la compra
function comprar() {
    let cantidad;
    do {
        cantidad = parseInt(prompt(`Ingrese la cantidad de ${tipoProducto}s que desea comprar:`));
        if (cantidad > stockDisponible) {
            alert(`Disculpe, ahora no tenemos suficiente stock disponible. Vuelva a intentar.`);
            console.log(`Disculpe, ahora no tenemos suficiente stock disponible. Vuelva a intentar.`);
        }
    } while (cantidad > stockDisponible);

    

    if (tipoProducto == "remera") {
        totalCompra = precioRemera * cantidad;
    } else if (tipoProducto == "taza") {
        totalCompra = precioTaza * cantidad;
    }
}

alert("El total de su compra es $" + totalCompra + ".");
console.log("El total de su compra es $" + totalCompra + ". ");

let seguirComprando = prompt("¿Desea seguir comprando? (si/no)");

if (seguirComprando === "si") {

    alert("Gracias por comprar en Noyack. " + userName + " Actualice la página para seguir comprando.");
    console.log("Gracias por comprar en Noyack. Actualice la página para seguir comprando.");
} else {
    alert("Gracias por comprar en Noyack. \n ¡Nos vemos la próxima!");
    console.log("Gracias por comprar en Noyack. \n ¡Nos vemos la próxima!");
}

