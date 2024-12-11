"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevaVenta() {
    const router = useRouter();

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("vendido");
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [productoBusqueda, setProductoBusqueda] = useState("");
    const [usuarioBusqueda, setUsuarioBusqueda] = useState("");

    // Cargar productos y usuarios
    useEffect(() => {
        async function fetchData() {
            try {
                const productosResponse = await axios.get("http://localhost:3000/P");
                setProductos(productosResponse.data);

                const usuariosResponse = await axios.get("http://localhost:3000/u");
                setUsuarios(usuariosResponse.data);
            } catch (error) {
                console.error("Error al cargar productos o usuarios:", error);
            }
        }
        fetchData();
    }, []);

    const handleCrearVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/v/nuevaVenta", {
                fecha,
                hora,
                estatus,
                idProducto,
                idUsuario,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al crear la venta:", error);
            alert("Error al crear la venta. Intenta nuevamente.");
        }
    };

    return (
        <div 
            className="container mt-5"
            style={{
                maxWidth: "800px",
                background: "#1c1c28",
                padding: "30px",
                borderRadius: "15px",
                color: "#f4f4f4",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <h2 
                className="text-center mb-4"
                style={{
                    fontWeight: "700",
                    fontSize: "2rem",
                    background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                Crear Nueva Venta
            </h2>
            <form onSubmit={handleCrearVenta}>
                <div className="mb-4">
                    <label className="form-label" style={{ color: "#ffa8d5" }}>Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        style={{ background: "#2e2e3e", color: "#fff", border: "1px solid #ffa8d5", borderRadius: "10px" }}
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label" style={{ color: "#ffa8d5" }}>Hora</label>
                    <input
                        type="time"
                        className="form-control"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                        style={{ background: "#2e2e3e", color: "#fff", border: "1px solid #ffa8d5", borderRadius: "10px" }}
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label" style={{ color: "#ffa8d5" }}>Estatus</label>
                    <select
                        className="form-select"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        required
                        style={{ background: "#2e2e3e", color: "#fff", border: "1px solid #ffa8d5", borderRadius: "10px" }}
                    >
                        <option value="vendido">Vendido</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="form-label" style={{ color: "#ffa8d5" }}>Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto"
                        value={productoBusqueda}
                        onChange={(e) => setProductoBusqueda(e.target.value)}
                        style={{ background: "#2e2e3e", color: "#fff", border: "1px solid #ffa8d5", borderRadius: "10px" }}
                    />
                    {productoBusqueda && (
                        <ul className="list-group mt-2" style={{ background: "#2e2e3e", color: "#fff" }}>
                            {productos
                                .filter((producto) =>
                                    producto.producto.toLowerCase().includes(productoBusqueda.toLowerCase())
                                )
                                .map((producto) => (
                                    <li
                                        key={producto.id}
                                        className="list-group-item"
                                        style={{ cursor: "pointer", background: "#393945", color: "#ffa8d5" }}
                                        onClick={() => {
                                            setIdProducto(producto.id);
                                            setProductoBusqueda(`${producto.producto} - ${producto.empresa}`);
                                        }}
                                    >
                                        {producto.producto} - {producto.empresa}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                <div className="mb-4">
                    <label className="form-label" style={{ color: "#ffa8d5" }}>Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar usuario"
                        value={usuarioBusqueda}
                        onChange={(e) => setUsuarioBusqueda(e.target.value)}
                        style={{ background: "#2e2e3e", color: "#fff", border: "1px solid #ffa8d5", borderRadius: "10px" }}
                    />
                    {usuarioBusqueda && (
                        <ul className="list-group mt-2" style={{ background: "#2e2e3e", color: "#fff" }}>
                            {usuarios
                                .filter((usuario) =>
                                    usuario.nombre.toLowerCase().includes(usuarioBusqueda.toLowerCase())
                                )
                                .map((usuario) => (
                                    <li
                                        key={usuario.id}
                                        className="list-group-item"
                                        style={{ cursor: "pointer", background: "#393945", color: "#ffa8d5" }}
                                        onClick={() => {
                                            setIdUsuario(usuario.id);
                                            setUsuarioBusqueda(usuario.nombre);
                                        }}
                                    >
                                        {usuario.nombre}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "10px 15px",
                        fontWeight: "600",
                    }}
                >
                    Crear Venta
                </button>
            </form>
        </div>
    );
}
