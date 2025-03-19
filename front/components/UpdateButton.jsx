"use client";
import axios from "axios";
import { modOrder, modFuncs } from "/res/dictionaries";
import { useRouter } from "next/navigation";
import { sha512 } from "/public/sha512";

const UpdateButton = ({del, add, type, itid, db, d})=>{
    const r = useRouter();
    if (del) return <span className="fakeButton" onClick={ () => axios.delete(`http://localhost:80/api/del/${itid}`).then(db ? r.refresh : r.back)}>Eliminar</span>

    if (add) return <span className="fakeButton" onClick={() => axios.post(`http://localhost:80/api/del/${itid}`).then(db ? r.refresh : r.back)}>Añadir</span>

    return <span className="fakeButton" onClick={ async () => axios.patch(`http://localhost:80/api/mod/${itid}`, d.pwd !== undefined ? {...d, pwd: await sha512(d.pwd)} : d).then(alert("actualizado con éxito")).then(r.refresh).then(r.back).then(r.refresh)} >Actualizar</span>
}
export default UpdateButton;