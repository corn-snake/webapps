export default function Cargando() {
    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100" 
            style={{
                backgroundColor: "#1a1a2e", 
                color: "#fff", 
                fontFamily: "'Poppins', sans-serif"
            }}
        >
            <div className="text-center">
                <h1 
                    style={{
                        color: "#00c6ff", 
                        fontWeight: "bold", 
                        fontSize: "2.5rem", 
                        background: "linear-gradient(90deg, #00c6ff, #0072ff)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent"
                    }}
                >
                    Cargando...
                </h1>
                <div 
                    className="spinner-border mt-3" 
                    style={{ 
                        width: "3rem", 
                        height: "3rem", 
                        color: "#42e695" 
                    }} 
                    role="status"
                >
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    );
}
