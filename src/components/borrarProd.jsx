"use client";
import axios from "axios";
import Link from "next/link";

export default function BorrarProducto({ id }) {
    async function borrar(event) {
        event.preventDefault();

        const url = "http://localhost:3000/p/eliminar/" + id;
        try {
            const respuesta = await axios.delete(url);
            console.log(respuesta);
            window.location.replace("/productos/mostrar");
        } catch (error) {
            console.error('Error al borrar el producto:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <Link href="#" onClick={borrar}>borrar</Link>
    );
}
