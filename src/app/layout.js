import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/menu";
import Script from "next/script";

export const metadata = {
  title: "Leopard Manager",
  description: "Storefront & Management"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        <header>
          <NavBar />
        </header>

        <main className="container my-5 flex-grow-1">
          {children}
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <p className="mb-0">© 2024 Leopard Management, Inc. All Rights Reserved</p>
        </footer>

        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
