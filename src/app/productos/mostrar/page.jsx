import BorrarProducto from "@/components/borrarProd"; // Cambia el componente para borrar productos
import Link from "next/link";
import axios from "axios";

async function getProductos() {
    const url = "http://localhost:3000/p/mostrarProductos";
    const productos = await axios.get(url);
    return productos.data;
}

export default async function Productos() {
    const productos = await getProductos();
    return (
        <>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Borrar</th>
                        <th>Modificar</th> {/* Columna de Modificar */}
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{producto.producto}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td><BorrarProducto id={producto.id} /></td> {/* Botón de Borrar */}
                                <td>
                                    <Link href={`/productos/modificar/${producto.id}`} className="btn btn-primary">
                                        Modificar
                                    </Link>
                                </td> {/* Botón de Modificar */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
