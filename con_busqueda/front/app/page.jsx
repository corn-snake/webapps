"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ()=>{
    const [li, sLi] = useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/login/check`, {withCredentials:true})
            .then(d => d.data)
            .then(d=>sLi(d))
    }, [])
    return <div>
        <h2>Está u.d. en el Sistema de Administración Shopfront</h2>
        <span>{li ? "" : <span>No ha <Link href="/login">iniciado sesión</Link>, por lo que solo podrá ver la lista de productos.</span>}</span>
    </div>
}
export default Page;