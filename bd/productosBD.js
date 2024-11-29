const productosBD = require("./conexion").productos;
const Producto = require("../clases/productosClases");

function validarDatos(productos2) {
    var datosCorrectos = false;
    if (productos2.producto != undefined && productos2.stock != undefined && productos2.precio != undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    var productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        const productos2 = producto1.getProducto;        
        if (validarDatos(productos2)) {
            productosValidos.push(productos2);
        }
    });
    return productosValidos;
}

async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    var productoValido = { error: true };
    if (validarDatos(producto1.getProducto)) {
        productoValido = producto1.getProducto;
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validarDatos(producto1.getProducto)) {
        await productosBD.add(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id) {
    const producto = await buscarPorId(id);
    var borrado = false;
    if (producto.error != true) {
        await productosBD.doc(id).delete();
        borrado = true;
    }
    return borrado;
}

async function modificarProducto(id, data) {
    const productoExistente = await buscarPorId(id);
    let productoModificado = false;

    if (productoExistente.error !== true) {
        const producto1 = new Producto(data);

        // Validamos los datos
        if (validarDatos(producto1.getProducto)) {
            await productosBD.doc(id).update(producto1.getProducto);
            productoModificado = true;
        }
    }

    return productoModificado;
}

async function autocompProducts (hint) {
    if(!hint)return (await productosBD.get()).docs.map(e=>e.data().producto);
    const d = (await productosBD.where("producto", ">=", [hint[0].toUpperCase(), ...hint.slice(1)].join()).get()).docs.map(e=>e.data().producto);
    return d;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorId,
    modificarProducto, // Exporta la nueva función
    autocompProducts
};
