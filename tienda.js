var productos;
var carrito;
var icono;
var capa;
var precioTotal;
var divProductos;
var numeroCarrito;

var listaProductos = [
    { nombre: "Filete de ternera", imagen: "Imagenes/carne.png", descripcion: "Filete de ternera de primera calidad", precio: 5 },
    { nombre: "Manzanas", imagen: "Imagenes/manzanas.png", descripcion: "Manzanas rojas dulces y brillantes", precio: 1 },
    { nombre: "Tomates", imagen: "Imagenes/tomates.png", descripcion: "Tomates frescos de la huerta", precio: 1.50 },
    { nombre: "Pan", imagen: "Imagenes/pan.png", descripcion: "Pan del día de nuestro horno del leña", precio: 1 },
    { nombre: "Leche", imagen: "Imagenes/leche.png", descripcion: "Leche de vaca semidesnatada", precio: 2 },
    { nombre: "Cebollas", imagen: "Imagenes/cebollas.png", descripcion: "Cebollas dulces de nuestra huerta", precio: 1.50 },
];
var listaProductosCarrito = [];

window.onload = function() {

    divProductos = document.querySelector("#productos");

    colocarProductos();

    productos = document.querySelectorAll("#productos div");
    carrito = document.querySelector("#carrito");
    icono = document.querySelector("#icono");
    capa = document.querySelector("#capa");
    precioTotal = document.querySelector("#carrito div");
    numeroCarrito = document.querySelector("#numeroCarrito");

    capa.style.display = "none";

    for (const producto of productos) {

        producto.addEventListener("click", clickProducto);
    }

    icono.addEventListener("click", sacarCarrito);

    capa.addEventListener("click", sacarCarrito);
}

function colocarProductos() {

    listaProductos.forEach(producto => {

        let div = document.createElement("div");

        let nombre = document.createElement("h4");
        nombre.innerText = producto.nombre;
        div.appendChild(nombre);

        let imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.width = 150;
        div.appendChild(imagen);

        let descripcion = document.createElement("div");
        descripcion.innerText = producto.descripcion;
        div.appendChild(descripcion);

        let precio = document.createElement("div");
        precio.innerText = `Precio: ${producto.precio.toString().replace(".", ",")} €`;
        div.appendChild(precio);

        divProductos.appendChild(div);
    });

}

function clickProducto() {

    let productoCarrito = listaProductosCarrito.find(x => x.nombre == this.children[0].innerText);

    if (productoCarrito) {

        productoCarrito.elemento.innerText = "Cantidad: " + ++productoCarrito.cantidad;
    } else {

        let div = document.createElement("div");

        let nombre = document.createElement("h4");
        nombre.innerText = this.children[0].innerText;
        div.appendChild(nombre);

        let imagen = document.createElement("img");
        imagen.src = this.children[1].src;
        imagen.width = 150;
        div.appendChild(imagen);

        let cantidad = document.createElement("div");
        cantidad.innerText = "Cantidad: 1";
        div.appendChild(cantidad);

        let precio = document.createElement("div");
        precio.innerText = this.children[3].innerText;
        div.appendChild(precio);

        let imagenBotonEliminar = document.createElement("img");
        imagenBotonEliminar.addEventListener("click", eliminarProductoCarrito);
        imagenBotonEliminar.id = "papelera";
        imagenBotonEliminar.src = "Imagenes/papelera.png";
        imagenBotonEliminar.width = 50;
        imagenBotonEliminar.height = 50;
        div.appendChild(imagenBotonEliminar);

        carrito.appendChild(div);

        listaProductosCarrito.push({
            nombre: nombre.innerText,
            imagen: imagen.src,
            precio: Number(precio.innerText.replace("Precio: ", "").replace(" €", "").replace(",", ".")),
            cantidad: 1,
            elemento: cantidad
        });
    }

    calcularTotal();

    numeroCarrito.style.display = "flex";
    numeroCarrito.innerText = Number(numeroCarrito.innerText) + 1;
}

function sacarCarrito() {

    carrito.style.right = carrito.style.right == "0px" ? "-800px" : "0px";

    capa.style.display = capa.style.display == "none" ? "block" : "none";
}

function calcularTotal() {

    let total = listaProductosCarrito.map(x => x.precio * x.cantidad).reduce((a, b) => a + b, 0);

    precioTotal.innerText = `Total: ${total.toFixed(2)}€`.replace(".", ",").replace(",00", "");
}

function eliminarProductoCarrito() {

    let nombre = this.parentNode.childNodes[0].innerText;

    let producto = listaProductosCarrito.find(x => x.nombre == nombre);

    if (producto.cantidad > 1) {
        this.parentNode.childNodes[2].innerText = "Cantidad: " + --producto.cantidad;
    } else {
        listaProductosCarrito.splice(listaProductosCarrito.indexOf(producto), 1);
        this.parentNode.parentNode.removeChild(this.parentNode);
    }

    calcularTotal();

    numeroCarrito.innerText = Number(numeroCarrito.innerText) - 1;

    if (listaProductosCarrito.length == 0) {
        numeroCarrito.style.display = "none";
    }
}