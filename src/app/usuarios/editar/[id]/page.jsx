"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import Loading from "@/app/usuarios/nuevo/loading";

export default function EditarUsuario({ params }) {
    const router = useRouter();
    const { id } = params;

    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEditUsuario = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/u/modificarUsuario/${id}`, {
                nombre,
                usuario,
                password
            });
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al editar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

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
                Editar Usuario
            </h2>
            <form 
                onSubmit={handleEditUsuario} 
                className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" 
                style={{
                    background: "rgba(26, 26, 46, 0.8)", 
                    border: "1px solid rgba(255, 255, 255, 0.1)", 
                    borderRadius: "10px", 
                    backdropFilter: "blur(10px)"
                }}
            >
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#fff" }}>Nombre</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nuevo nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{
                            borderColor: "#9c27b0", 
                            backgroundColor: "#424242", 
                            color: "#fff"
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#fff" }}>Usuario</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nuevo usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        style={{
                            borderColor: "#9c27b0", 
                            backgroundColor: "#424242", 
                            color: "#fff"
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#fff" }}>Contraseña (opcional)</label>
                    <input
                        type="password"
                        className="form-control rounded-3"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            borderColor: "#9c27b0", 
                            backgroundColor: "#424242", 
                            color: "#fff"
                        }}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 rounded-3" 
                    style={{
                        background: "linear-gradient(135deg, #42e695, #3bb2b8)", 
                        color: "#fff"
                    }}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
