"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function MostrarVentas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        async function fetchVentas() {
            try {
                const response = await axios.get("http://localhost:3000/v");
                setVentas(response.data);
            } catch (error) {
                console.error("Error al cargar las ventas:", error);
                alert("Error al cargar las ventas.");
            }
        }
        fetchVentas();
    }, []);

    // Filtrar las ventas que no están canceladas
    const ventasActivas = ventas.filter(venta => venta.estatus !== "cancelado");

    return (
        <div 
            className="container mt-5"
            style={{
                maxWidth: "1200px",
                backgroundColor: "#1a1a2e",
                padding: "20px",
                borderRadius: "15px",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <h2 
                className="text-center mb-4"
                style={{
                    fontWeight: "700",
                    fontSize: "2.5rem",
                    background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                Lista de Ventas
            </h2>
            
            <div className="p-4 rounded-4">
                <table 
                    className="table text-center"
                    style={{
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                        color: "#fff",
                        fontSize: "1rem"
                    }}
                >
                    <thead>
                        <tr style={{ background: "#ff758c", color: "#fff", borderRadius: "8px" }}>
                            <th>Num</th>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estatus</th>
                            <th>Producto</th>
                            <th>Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasActivas.map((venta, index) => (
                            <tr key={venta.id} style={{ background: "#16213e", borderRadius: "8px" }}>
                                <td>{index + 1}</td>
                                <td>{venta.id}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.hora}</td>
                                <td 
                                    style={{
                                        color: venta.estatus === "cancelado" ? "#ff4d4d" : "#00ffab",
                                        fontWeight: "600"
                                    }}
                                >
                                    {venta.estatus}
                                </td>
                                <td>{venta.producto}</td>
                                <td>{venta.usuario}</td>
                                <td>
                                    <Link href={`/ventas/editar/${venta.id}`}>
                                        <button
                                            className="btn btn-sm me-2"
                                            style={{
                                                background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            Editar
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-sm"
                                        style={{
                                            background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "8px",
                                        }}
                                        onClick={async () => {
                                            try {
                                                await axios.put(`http://localhost:3000/v/cancelarVenta/${venta.id}`);
                                                alert("Venta cancelada con éxito");
                                                setVentas(ventas.map(v => v.id === venta.id ? { ...v, estatus: "cancelado" } : v));
                                            } catch (error) {
                                                console.error("Error al cancelar la venta:", error);
                                                alert("No se pudo cancelar la venta. Intenta nuevamente.");
                                            }
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
