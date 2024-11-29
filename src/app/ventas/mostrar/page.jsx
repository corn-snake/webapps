import BorrarVenta from "@/components/borrarVent"; // Asegúrate de tener este componente
import Link from "next/link";
import axios from "axios";

async function getVentas() {
    const url = "http://localhost:3000/t/";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th> {/* Cambiado de Id a # para indicar el índice */}
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Estatus</th>
                        <th>Producto</th> {/* Cambiado de Id Producto a Producto */}
                        <th>Usuario</th> {/* Cambiado de Id Usuario a Usuario */}
                        <th>Borrar</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas
                            .map((venta, index) => (
                                <tr key={venta.id}>
                                    <td>{index + 1}</td> {/* Mostrar el índice como número secuencial */}
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.fecha_hora}</td>
                                    <td>{venta.estatus}</td>
                                    <td>{venta.producto}</td> {/* Mostrar el nombre del producto */}
                                    <td>{venta.usuario}</td> {/* Mostrar el nombre del usuario */}
                                    <td><BorrarVenta id={venta.id} /></td>
                                    <td>
                                        <Link href={`/ventas/modificar/${venta.id}`} className="btn btn-primary">
                                            Modificar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </>
    );
}
