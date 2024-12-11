"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditarVenta() {
    const router = useRouter();
    const { id } = useParams();

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [productoBusqueda, setProductoBusqueda] = useState("");
    const [usuarioBusqueda, setUsuarioBusqueda] = useState("");

    useEffect(() => {
        async function fetchVenta() {
            try {
                const response = await axios.get(`http://localhost:3000/v/buscarPorId/${id}`);
                const venta = response.data;

                if (venta) {
                    setFecha(venta.fecha || "");
                    setHora(venta.hora || "");
                    setEstatus(venta.estatus || "");
                    setIdProducto(venta.idProducto || "");
                    setIdUsuario(venta.idUsuario || "");
                    setProductoBusqueda(venta.producto || "Producto no encontrado");
                    setUsuarioBusqueda(venta.usuario || "Usuario no encontrado");
                }
            } catch (error) {
                console.error("Error al cargar la venta:", error);
            }
        }
        fetchVenta();
    }, [id]);

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

    const handleEditarVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/v/modificarVenta/${id}`, {
                fecha,
                hora,
                estatus,
                idProducto,
                idUsuario,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al editar la venta:", error);
            alert("Error al editar la venta. Intenta nuevamente.");
        }
    };

    return (
        <div 
            className="container mt-5 p-5"
            style={{
                backgroundColor: "#1a1a2e", 
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                maxWidth: "700px",
                margin: "0 auto"
            }}
        >
            <h2 
                className="text-center mb-4"
                style={{
                    fontWeight: "700",
                    fontSize: "2.5rem",
                    background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                }}
            >
                Editar Venta
            </h2>
            <form onSubmit={handleEditarVenta} className="p-4 rounded-4">
                <div className="mb-3">
                    <label 
                        className="form-label"
                        style={{ color: "#00c6ff", fontWeight: "600" }}
                    >
                        Fecha
                    </label>
                    <input
                        type="date"
                        className="form-control rounded-3"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#ff7eb3",
                            color: "#fff"
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label 
                        className="form-label"
                        style={{ color: "#00c6ff", fontWeight: "600" }}
                    >
                        Hora
                    </label>
                    <input
                        type="time"
                        className="form-control rounded-3"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#ff7eb3",
                            color: "#fff"
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label 
                        className="form-label"
                        style={{ color: "#00c6ff", fontWeight: "600" }}
                    >
                        Estatus
                    </label>
                    <select
                        className="form-select rounded-3"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        required
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#ff7eb3",
                            color: "#fff"
                        }}
                    >
                        <option value="vendido">Vendido</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label 
                        className="form-label"
                        style={{ color: "#00c6ff", fontWeight: "600" }}
                    >
                        Producto
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto"
                        value={productoBusqueda}
                        onChange={(e) => setProductoBusqueda(e.target.value)}
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#ff7eb3",
                            color: "#fff"
                        }}
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
                <div className="mb-3">
                    <label 
                        className="form-label"
                        style={{ color: "#00c6ff", fontWeight: "600" }}
                    >
                        Usuario
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar usuario"
                        value={usuarioBusqueda}
                        onChange={(e) => setUsuarioBusqueda(e.target.value)}
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#ff7eb3",
                            color: "#fff"
                        }}
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
                        background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "30px",
                        padding: "10px 0",
                        fontWeight: "600"
                    }}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
