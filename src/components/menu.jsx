"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  const currentPath = usePathname() || "";

  let options = [];
  if (currentPath.startsWith("/usuarios")) {
    options = [
      { label: "Usuarios", href: "http://localhost:3001/usuarios/mostrar" },
      { label: "Nuevo Usuario", href: "http://localhost:3001/usuarios/nuevo" },
      { label: "Modificar Usuario", href: "http://localhost:3001/usuarios/modificar" },
    ];
  } else if (currentPath.startsWith("/productos")) {
    options = [
      { label: "Mostrar Productos", href: "http://localhost:3001/productos/mostrar" },
      { label: "Nuevo Producto", href: "http://localhost:3001/productos/nuevo" },
      { label: "Modificar Producto", href: "http://localhost:3001/productos/modificar" },
    ];
  } else if (currentPath.startsWith("/ventas")) {
    options = [
      { label: "Mostrar Ventas", href: "http://localhost:3001/ventas/mostrar" },
      { label: "Nueva Venta", href: "http://localhost:3001/ventas/nuevo" },
      { label: "Modificar Venta", href: "http://localhost:3001/ventas/modificar" },
    ];
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">Leopard Manager</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/usuarios/mostrar">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/productos/mostrar">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/ventas/mostrar">Ventas</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Más Opciones
              </Link>
              <ul className="dropdown-menu">
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <li key={index}>
                      <Link className="dropdown-item" href={option.href}>
                        {option.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">No hay opciones disponibles</li>
                )}
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
