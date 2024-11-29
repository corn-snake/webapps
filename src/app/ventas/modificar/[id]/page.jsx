"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function ModificarVenta({ params }) {
    const router = useRouter();
    const { id } = params;
    const [venta, setVenta] = useState({ cantidad: '', estatus: '', fecha_hora: '', producto: '', usuario: '' });

    useEffect(() => {
        const fechaActual = new Date();
        const fechaISO = fechaActual.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:mm

        axios.get(`http://localhost:3000/t/${id}`)
            .then(response => setVenta({ ...response.data, fecha_hora: fechaISO }))
            .catch(error => console.error("Error al obtener la venta:", error));
    }, [id]);

    const modificarVenta = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/t/modificarVenta/${id}`;
        
        try {
            await axios.put(url, venta);
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error('Error al modificar la venta:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Modificar Venta</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">Cantidad</label>
                            <input 
                                className="form-control" 
                                id="cantidad" 
                                required 
                                type="number" 
                                value={venta.cantidad} 
                                onChange={(e) => setVenta({ ...venta, cantidad: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="estatus" className="form-label">Estatus</label>
                            <select 
                                className="form-control" 
                                id="estatus" 
                                required 
                                value={venta.estatus} 
                                onChange={(e) => setVenta({ ...venta, estatus: e.target.value })}
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="cancelado">Cancelado</option>
                                <option value="vendido">Vendido</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fecha_hora" className="form-label">Fecha</label>
                            <input 
                                className="form-control" 
                                id="fecha_hora" 
                                required 
                                type="datetime-local" 
                                value={venta.fecha_hora} 
                                onChange={(e) => setVenta({ ...venta, fecha_hora: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="producto" className="form-label">Producto</label>
                            <input 
                                className="form-control" 
                                id="producto" 
                                required 
                                type="text" 
                                value={venta.producto} 
                                onChange={(e) => setVenta({ ...venta, producto: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input 
                                className="form-control" 
                                id="usuario" 
                                required 
                                type="text" 
                                value={venta.usuario} 
                                onChange={(e) => setVenta({ ...venta, usuario: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button className="btn btn-primary col-12" type="submit">Guardar Cambios</button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
