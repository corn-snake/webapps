class Producto {
    constructor(data) {
        this.id = data.id;
        this.producto = data.producto;
        this.stock = data.stock;
        this.precio = data.precio;
    }

    set id(id) {
        this._id = id;
    }
    
    set producto(producto) {
        const productoRegex = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (productoRegex.test(producto)) {
            this._producto = producto;
        }
    }
    
    set stock(stock) {
        const stockRegex = /^\d+$/;  // Acepta solo números enteros
        if (stockRegex.test(stock)) {
            this._stock = parseInt(stock, 10);
        }
    }
    
    set precio(precio) {
        const precioRegex = /^\d+(\.\d+)?$/;
        if (precioRegex.test(precio)) {
            this._precio = parseFloat(precio);
        }
    }
    
    get id() {
        return this._id;
    }
    
    get producto() {
        return this._producto;
    }
    
    get stock() {
        return this._stock;
    }
    
    get precio() {
        return this._precio;
    }
    
    get getProducto() {
        const conid = {
            id: this._id,
            producto: this._producto,
            stock: this._stock,
            precio: this._precio,
        }
        const sinid = {
            producto: this._producto,
            stock: this._stock,
            precio: this._precio,
        }
        return this.id != undefined ? conid : sinid;
    }
}

module.exports = Producto;
