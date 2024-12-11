"use client";

import Link from "next/link";

export default function Inicio() {
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
                style={{
                    fontWeight: "700", 
                    fontSize: "2.8rem", 
                    background: "linear-gradient(90deg, #00c6ff, #0072ff)", 
                    WebkitBackgroundClip: "text", 
                    color: "transparent"
                }}
            >
                Bienvenido
            </h1>
            <p 
                className="lead mt-3" 
                style={{
                    color: "#d1d1e9", 
                    fontSize: "1.2rem", 
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
                }}
            >
                Gestiona usuarios, productos y ventas con una experiencia futurista y eficiente.
            </p>
            <div 
                className="mt-4" 
                style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)", 
                    borderRadius: "10px", 
                    padding: "20px", 
                    backdropFilter: "blur(10px)", 
                    background: "rgba(26, 26, 46, 0.8)"
                }}
            >
                <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
                    Selecciona una opción para explorar:
                </p>
                <div className="d-flex justify-content-center gap-4 mt-3">
                    <Link href="/usuarios/mostrar">
                        <button 
                            className="btn btn-lg" 
                            style={{
                                background: "linear-gradient(135deg, #00c6ff, #0072ff)", 
                                color: "#fff", 
                                borderRadius: "50px", 
                                padding: "12px 30px", 
                                boxShadow: "0 4px 10px rgba(0, 114, 255, 0.6)",
                                fontWeight: "600",
                                letterSpacing: "1px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-3px)";
                                e.target.style.boxShadow = "0 6px 15px rgba(0, 114, 255, 0.8)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 10px rgba(0, 114, 255, 0.6)";
                            }}
                        >
                            Ver Usuarios
                        </button>
                    </Link>
                    <Link href="/productos/mostrar">
                        <button 
                            className="btn btn-lg" 
                            style={{
                                background: "linear-gradient(135deg, #42e695, #3bb2b8)", 
                                color: "#fff", 
                                borderRadius: "50px", 
                                padding: "12px 30px", 
                                boxShadow: "0 4px 10px rgba(59, 178, 184, 0.6)",
                                fontWeight: "600",
                                letterSpacing: "1px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-3px)";
                                e.target.style.boxShadow = "0 6px 15px rgba(59, 178, 184, 0.8)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 10px rgba(59, 178, 184, 0.6)";
                            }}
                        >
                            Ver Productos
                        </button>
                    </Link>
                    <Link href="/ventas/mostrar">
                        <button 
                            className="btn btn-lg" 
                            style={{
                                background: "linear-gradient(135deg, #ff758c, #ff7eb3)", 
                                color: "#fff", 
                                borderRadius: "50px", 
                                padding: "12px 30px", 
                                boxShadow: "0 4px 10px rgba(255, 126, 179, 0.6)",
                                fontWeight: "600",
                                letterSpacing: "1px",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-3px)";
                                e.target.style.boxShadow = "0 6px 15px rgba(255, 126, 179, 0.8)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 10px rgba(255, 126, 179, 0.6)";
                            }}
                        >
                            Ver Ventas
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-5 text-center">
                <p style={{ color: "#d1d1e9", fontSize: "1rem" }}>
                    Explora y gestiona con estilo. La eficiencia del futuro está a tu alcance.
                </p>
            </div>
        </div>
    );
}
