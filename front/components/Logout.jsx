"use client";

const { useRouter } = require("next/navigation");

const Logout = () => {
    const r = useRouter();
    return <button onClick={() => { document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; console.log(document.cookie); r.refresh()}}>Cerrar Sesión</button>}

export default Logout;