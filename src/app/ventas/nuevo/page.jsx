"use client";

import Autocomplete from "@/components/autocomplete";
import axios from "axios";

async function autocomplete(type, select) {
    const sel = document.getElementById(select),
        val = document.getElementById(type).value;
    if(sel.children.length > 0) [...sel.children].forEach(e=>sel.removeChild(e));
    const opts = (await axios.post(
        "http://localhost:3000/"
        + ({usuario: "u/",
            producto: "p/"
        })[type]
        + "autocompletar",
        {hint: val
    })).data;
    console.log(await opts);
    (await opts).forEach(e=>{
        if(e=="")return;
        const o = document.createElement("option");
        o.value = e;
        o.text = e;
        sel.appendChild(o);
    });
}

async function guardarVenta(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log("Estas en guardarVenta");

    const url = "http://localhost:3000/t/nuevaVenta"; // Endpoint actualizado
    const datos = {
        cantidad: document.getElementById("cantidad").value,
        producto: document.getElementById("producto").value, // Cambiado a "producto"
        usuario: document.getElementById("usuario").value,   // Cambiado a "usuario"
        estatus: document.getElementById("estatus").value,
    };

    try {
        const respuesta = await axios.post(url, datos); // Llamada a la API actualizada
        console.log("Venta guardada:", respuesta.data);
        window.location.href = "http://localhost:3001/ventas/mostrar"; // Redirigir después de guardar
    } catch (error) {
        console.error('Error al guardar la venta:', error.response ? error.response.data : error.message);
    }
}

export default function NuevaVenta() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5" action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Nueva Venta</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">Cantidad</label>
                            <input className="form-control" id="cantidad" required type="number" min="1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inp_producto" className="form-label">Producto</label>
                            <Autocomplete type="producto" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inp_usuario" className="form-label">Usuario</label>
                            <Autocomplete type="usuario" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="estatus" className="form-label">Estatus</label>
                            <select className="form-control" id="estatus" required>
                                <option value="pendiente">Pendiente</option>
                                <option value="cancelado">Cancelado</option>
                                <option value="vendido">Vendido</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button typeof="submit" className="btn btn-primary col-12" type="submit">Guardar Nueva Venta</button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
