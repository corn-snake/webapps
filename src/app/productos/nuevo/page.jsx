"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevoProducto() {
    const router = useRouter();
    const [empresa, setEmpresa] = useState("");
    const [producto, setProducto] = useState("");
    const [tipoProducto, setTipoProducto] = useState(""); // Nuevo campo tipoProducto

    const handleNuevoProducto = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/P/nuevoProducto", {
                empresa,
                producto,
                tipoProducto
            });
            console.log("Respuesta del servidor:", response.data);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error al crear el producto:", error);
            if (error.response) {
                alert(`Error al crear nuevo producto: ${error.response.data.error || "Error desconocido"} (Código: ${error.response.status})`);
            } else if (error.request) {
                alert("Error: No se recibió respuesta del servidor. Verifica la conexión.");
            } else {
                alert(`Error al configurar la solicitud: ${error.message}`);
            }
        }
    };

    return (
        <div 
            className="container mt-5 p-5" 
            style={{
                backgroundColor: "#1a1a2e", 
                borderRadius: "15px", 
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                color: "#fff", 
                fontFamily: "'Poppins', sans-serif"
            }}
        >
            <h2 
                className="text-center mb-4" 
                style={{
                    fontWeight: "700", 
                    fontSize: "2.5rem", 
                    background: "linear-gradient(90deg, #00c6ff, #0072ff)", 
                    WebkitBackgroundClip: "text", 
                    color: "transparent"
                }}
            >
                Agregar Producto
            </h2>
            <form 
                onSubmit={handleNuevoProducto} 
                className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" 
                style={{
                    background: "rgba(26, 26, 46, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)", 
                    borderRadius: "10px", 
                    backdropFilter: "blur(10px)"
                }}
            >
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#42e695" }}>Empresa</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nombre de la empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#42e695" }}>Producto</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nombre del producto"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        required
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#42e695" }}>Tipo de Producto</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Tipo de producto"
                        value={tipoProducto}
                        onChange={(e) => setTipoProducto(e.target.value)}
                        style={{ borderColor: "#9c27b0" }}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 rounded-3" 
                    style={{
                        background: "linear-gradient(135deg, #ff758c, #ff7eb3)", 
                        color: "#fff", 
                        boxShadow: "0 4px 10px rgba(255, 126, 179, 0.6)"
                    }}
                >
                    Agregar Producto
                </button>
            </form>
        </div>
    );
}
