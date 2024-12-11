"use client";

import axios from "axios";

async function guardarUsuario(e) {
    e.preventDefault();
    console.log("Estas en guardarUsuario");

    const url = "http://localhost:3000/u/nuevoUsuario";
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    const respuesta = await axios.post(url, datos);
    window.location.href = "http://localhost:3001/usuarios/mostrar";
}

export default function NuevoUsuario() {
    return (
        <div 
            className="m-0 row justify-content-center mt-5" 
            style={{
                backgroundColor: "#1a1a2e", 
                borderRadius: "15px", 
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif"
            }}
        >
            <form onSubmit={guardarUsuario} className="col-md-6">
                <div 
                    className="card shadow-lg rounded-4 border-0" 
                    style={{
                        backgroundColor: "rgba(26, 26, 46, 0.8)", 
                        border: "1px solid rgba(255, 255, 255, 0.1)", 
                        backdropFilter: "blur(10px)"
                    }}
                >
                    <div 
                        className="card-header text-center" 
                        style={{
                            background: "linear-gradient(90deg, #00c6ff, #0072ff)", 
                            color: "#fff", 
                            fontWeight: "700", 
                            fontSize: "2rem"
                        }}
                    >
                        <h1>Nuevo Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Nombre"
                            className="form-control mb-3 rounded-3"
                            id="nombre"
                            required
                            autoFocus
                            type="text"
                            style={{
                                borderColor: "#9c27b0", 
                                backgroundColor: "#424242", 
                                color: "#fff"
                            }}
                        />
                        <input
                            placeholder="Usuario"
                            className="form-control mb-3 rounded-3"
                            id="usuario"
                            required
                            type="text"
                            style={{
                                borderColor: "#9c27b0", 
                                backgroundColor: "#424242", 
                                color: "#fff"
                            }}
                        />
                        <input
                            placeholder="Contraseña"
                            className="form-control mb-3 rounded-3"
                            id="password"
                            required
                            type="password"
                            style={{
                                borderColor: "#9c27b0", 
                                backgroundColor: "#424242", 
                                color: "#fff"
                            }}
                        />
                    </div>
                    <div className="card-footer">
                        <button
                            type="submit"
                            className="btn w-100 rounded-3"
                            style={{
                                background: "linear-gradient(135deg, #42e695, #3bb2b8)", 
                                color: "#fff"
                            }}
                        >
                            Guardar nuevo Usuario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
