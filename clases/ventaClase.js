class Venta {
    constructor(data) {
        this.id = data.id;
        this.idUsuario = data.idUsuario;
        this.idProducto = data.idProducto;
        this.cantidad = data.cantidad;  // Agregar campo cantidad
        this.fechaHora = data.fecha_hora;  // Cambiar para usar el campo fecha_hora
        this.estatus = data.estatus;
    }

    set id(id) {
        this._id = id;
    }

    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario;
    }

    set idProducto(idProducto) {
        this._idProducto = idProducto;
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad;  // Asignar la cantidad
    }

    set fechaHora(fechaHora) {
        this._fechaHora = fechaHora;  // Usar un solo campo para fecha y hora
    }

    set estatus(estatus) {
        this._estatus = estatus;
    }

    get getVenta() {
        const conid = {
            id: this._id,
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            cantidad: this._cantidad,  // Incluir campo cantidad
            fecha_hora: this._fechaHora,  // Usar campo fecha_hora
            estatus: this._estatus
        };

        const sinid = {
            idUsuario: this._idUsuario,
            idProducto: this._idProducto,
            cantidad: this._cantidad,  // Incluir campo cantidad
            fecha_hora: this._fechaHora,  // Usar campo fecha_hora
            estatus: this._estatus
        };

        return this._id ? conid : sinid;
    }
}

module.exports = Venta;
