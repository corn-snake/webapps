"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ModDelButtons = ({itid, type}) =>{
    const rut = useRouter();
    const [adm, sAdm] = useState(false);
    const [fin, sFin] = useState("");
    axios.get("http://localhost:8080/api/login/checkAdmin").then(d => sAdm(d.data));
    useEffect(() => sFin(adm ? <>
        <td><button onClick={() => rut.push(`/mod/${type}/${itid}`)}>Modificar</button></td>
        <td><button onClick={() => axios.delete(`http://localhost:8080/api/del/${type}/${itid}`)}>Eliminar</button></td>
    </>: ""), [adm]);
    return <>{fin}</>;
};
export default ModDelButtons;