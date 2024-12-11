"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Usa el módulo correcto

export default function NavBar() {
    const [searchQuery, setSearchQuery] = useState(""); // Estado para el término de búsqueda
    const pathname = usePathname(),
        r=useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        // Redirigir según la ruta actual
        if (pathname.includes("usuarios")) {
            r.push(`/usuarios/mostrar?query=${searchQuery}`);
        } else if (pathname.includes("productos")) {
            r.push(`/productos/mostrar?query=${searchQuery}`);
        } else if (pathname.includes("ventas")) {
            r.push(`/ventas/mostrar?query=${searchQuery}`);
        } else {
            alert("Búsqueda no disponible en esta sección");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#212121" }}>
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    href="/"
                    style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.8rem",
                        letterSpacing: "1px",
                    }}
                >
                    Mi Aplicación
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{
                            backgroundColor: "#fff",
                        }}
                    ></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                                style={{
                                    color: "#f5f5f5",
                                    fontWeight: "500",
                                    fontSize: "1.1rem",
                                }}
                            >
                                Inicio
                            </Link>
                        </li>
                        {/* Dropdown para Usuarios */}
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{
                                    color: "#f5f5f5",
                                    fontWeight: "500",
                                    fontSize: "1.1rem",
                                }}
                            >
                                Usuarios
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#333" }}>
                                <li>
                                    <Link className="dropdown-item" href="/usuarios/mostrar" style={{ color: "#fff" }}>
                                        Mostrar
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/usuarios/nuevo" style={{ color: "#fff" }}>
                                        Crear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* Dropdown para Productos */}
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{
                                    color: "#f5f5f5",
                                    fontWeight: "500",
                                    fontSize: "1.1rem",
                                }}
                            >
                                Productos
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#333" }}>
                                <li>
                                    <Link className="dropdown-item" href="/productos/mostrar" style={{ color: "#fff" }}>
                                        Mostrar
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/productos/nuevo" style={{ color: "#fff" }}>
                                        Crear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* Dropdown para Ventas */}
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{
                                    color: "#f5f5f5",
                                    fontWeight: "500",
                                    fontSize: "1.1rem",
                                }}
                            >
                                Ventas
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#333" }}>
                                <li>
                                    <Link className="dropdown-item" href="/ventas/mostrar" style={{ color: "#fff" }}>
                                        Mostrar
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/ventas/nuevo" style={{ color: "#fff" }}>
                                        Crear
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2 rounded-3"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Buscar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                borderColor: "#fff",
                                backgroundColor: "#424242",
                                color: "#fff",
                            }}
                        />
                        <button
                            className="btn"
                            type="submit"
                            style={{
                                backgroundColor: "#616161",
                                color: "#fff",
                                borderRadius: "3px",
                            }}
                        >
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
