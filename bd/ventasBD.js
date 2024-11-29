const ventasBD = require("./conexion").ventas; // Se asume que ya configuraste ventas en conexion.js
const admin = require('firebase-admin'); // Importar admin para usar Timestamp de Firestore

// Validar el estatus permitido
const estatusPermitidos = ["pendiente", "vendido", "cancelado"];

// Función para convertir marca de tiempo de Firestore a fecha y hora legible
function timestampToReadableDate(timestamp) {
    const date = new Date(timestamp._seconds * 1000); // Convertir segundos a milisegundos
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Mostrar todas las ventas
async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.where("estatus", "!=", "cancelado").get();  // Obtener todas las ventas desde Firestore
    const ventas = [];
    ventasSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.fecha_hora && data.fecha_hora._seconds) {
            data.fecha_hora = timestampToReadableDate(data.fecha_hora); // Convertir la fecha a formato legible
        }
        ventas.push({ id: doc.id, ...data });
    });
    return ventas;
}

// Buscar venta por ID
async function buscarPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    if (!ventaDoc.exists) {
        return null;  // Si no existe la venta, retorna null
    }
    
    const data = ventaDoc.data();
    if (data.fecha_hora && data.fecha_hora._seconds) {
        data.fecha_hora = timestampToReadableDate(data.fecha_hora); // Convertir la fecha a formato legible
    }
    
    return { id: ventaDoc.id, ...data };
}

// Crear nueva venta
async function nuevaVenta(data) {
    // Verificar que los campos obligatorios estén presentes
    if (!data.producto || !data.usuario || !data.cantidad) {
        throw new Error("Los campos 'producto', 'usuario' y 'cantidad' son obligatorios.");
    }

    // Buscar el producto en la colección "producto"
    const productoSnapshot = await ventasBD.firestore.collection("producto").where("producto", "==", data.producto).get();
    if (productoSnapshot.empty) {
        throw new Error(`El producto '${data.producto}' no existe.`);
    }

    const productoData = productoSnapshot.docs[0].data();
    const id_producto = productoSnapshot.docs[0].id; // Extraer el ID del producto

    // Buscar el usuario en la colección "ejemplobd"
    const usuarioSnapshot = await ventasBD.firestore.collection("ejemplobd").where("usuario", "==", data.usuario).get();
    if (usuarioSnapshot.empty) {
        throw new Error(`El usuario '${data.usuario}' no existe.`);
    }

    const usuarioData = usuarioSnapshot.docs[0].data();
    const id_usuario = usuarioSnapshot.docs[0].id; // Extraer el ID del usuario

    // Ignorar cualquier valor proporcionado en 'fecha_hora' y usar la fecha y hora actual en formato Timestamp
    const fechaHora = admin.firestore.Timestamp.now(); // Usa Timestamp de Firestore para la fecha y hora actual

    // Crear la venta con los datos proporcionados
    const venta = {
        cantidad: data.cantidad, // Cantidad obligatoria
        producto: data.producto, // Guardamos el nombre del producto
        usuario: data.usuario,   // Guardamos el nombre del usuario
        id_producto,             // ID del producto obtenido
        id_usuario,              // ID del usuario obtenido
        estatus: data.estatus || "pendiente", // Estado inicial
        fecha_hora: fechaHora    // Fecha y hora actual
    };

    // Guardar la venta en Firestore
    const nuevaVentaRef = await ventasBD.add(venta); // Agregar nueva venta con ID automático
    return nuevaVentaRef.id; // Retornar el ID de la venta creada
}

// Función para modificar todos los campos de una venta
async function modificarVenta(id, data) {
    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" }; // Retorna error si no existe
    }

    // Buscar el producto en la colección "producto"
    const productoSnapshot = await ventasBD.firestore.collection("producto").where("producto", "==", data.producto).get();
    if (productoSnapshot.empty) {
        return { error: `El producto '${data.producto}' no existe.` };
    }

    const productoData = productoSnapshot.docs[0].data();

    // Buscar el usuario en la colección "ejemplobd"
    const usuarioSnapshot = await ventasBD.firestore.collection("ejemplobd").where("usuario", "==", data.usuario).get();
    if (usuarioSnapshot.empty) {
        return { error: `El usuario '${data.usuario}' no existe.` };
    }

    const usuarioData = usuarioSnapshot.docs[0].data();

    // Actualizar la venta con los datos proporcionados
    await ventasBD.doc(id).update({
        cantidad: data.cantidad || venta.cantidad,
        producto: data.producto || venta.producto, // Actualizamos producto
        usuario: data.usuario || venta.usuario, // Actualizamos usuario
        estatus: data.estatus || venta.estatus,
        fecha_hora: data.fecha_hora ? admin.firestore.Timestamp.fromDate(new Date(data.fecha_hora)) : venta.fecha_hora
    });

    return { success: true, message: "Venta modificada con éxito." };
}

// Actualizar el estatus de la venta
async function actualizarEstatus(id, nuevoEstatus) {
    if (!estatusPermitidos.includes(nuevoEstatus)) {
        return { error: "Estatus no permitido. Debe ser 'pendiente', 'vendido' o 'cancelado'." };
    }

    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  // Retorna error si no existe
    }

    await ventasBD.doc(id).update({ estatus: nuevoEstatus });
    return { success: true, message: `Venta actualizada a '${nuevoEstatus}' con éxito.` };
}

// Cancelar venta (actualizar estatus a "cancelado")
async function cancelarVenta(id) {
    return await actualizarEstatus(id, "cancelado");
}

// Marcar venta como vendida (actualizar estatus a "vendido")
async function marcarComoVendida(id) {
    return await actualizarEstatus(id, "vendido");
}

// Borrar venta por ID
async function borrarVenta(id) {
    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  // Retorna error si no existe
    }

    await ventasBD.doc(id).delete();  // Eliminar la venta
    return { success: true, message: "Venta borrada con éxito." };
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta,
    marcarComoVendida,
    modificarVenta,
    borrarVenta  // Nueva función para borrar venta
};
