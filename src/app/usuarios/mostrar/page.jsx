"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchUsuarios() {
            const response = await axios.get("http://localhost:3000/u");
            setUsuarios(response.data);
        }
        fetchUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await axios.delete(`http://localhost:3000/u/borrarUsuario/${id}`);
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
                alert("Usuario eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un error al eliminar el usuario");
            }
        }
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
        usuario.usuario.toLowerCase().includes(search.toLowerCase())
    );

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
            <h1 
                className="text-center mb-4" 
                style={{
                    fontWeight: "700", 
                    fontSize: "2.5rem", 
                    background: "linear-gradient(90deg, #00c6ff, #0072ff)", 
                    WebkitBackgroundClip: "text", 
                    color: "transparent"
                }}
            >
                Lista de Usuarios
            </h1>
            <input
                type="text"
                placeholder="Buscar usuarios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control mb-4"
                style={{
                    backgroundColor: "#1a1a2e",
                    color: "#d1d1e9",
                    border: "1px solid #0072ff",
                    borderRadius: "10px"
                }}
            />
            <div 
                className="card shadow-lg p-4 rounded-4 border-0" 
                style={{
                    background: "rgba(26, 26, 46, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)", 
                    borderRadius: "10px", 
                    backdropFilter: "blur(10px)"
                }}
            >
                <div className="card-body">
                    <table 
                        className="table table-borderless text-center"
                        style={{ color: "#d1d1e9" }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "rgba(0, 114, 255, 0.2)" }}>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsuarios.map((usuario, index) => (
                                <tr key={usuario.id} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.usuario}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm text-white"
                                            style={{
                                                background: "linear-gradient(135deg, #ff758c, #ff7eb3)", 
                                                borderRadius: "50px", 
                                                padding: "5px 15px",
                                                border: "none",
                                                boxShadow: "0 4px 10px rgba(255, 126, 179, 0.6)"
                                            }}
                                            onClick={() => eliminarUsuario(usuario.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td>
                                        <Link href={`/usuarios/editar/${usuario.id}`}>
                                            <button
                                                className="btn btn-sm text-white"
                                                style={{
                                                    background: "linear-gradient(135deg, #42e695, #3bb2b8)", 
                                                    borderRadius: "50px", 
                                                    padding: "5px 15px",
                                                    border: "none",
                                                    boxShadow: "0 4px 10px rgba(59, 178, 184, 0.6)"
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
