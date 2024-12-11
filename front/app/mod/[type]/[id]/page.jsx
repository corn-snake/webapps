"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const Modify = async ({params}) =>{
    const rut = useRouter();
    return <div className="modifier">{await axios.get(`http://localhost:8080/read/${params.type}/id/${params.id}`).then(d=>d.data).then(d=>Object.keys(d).map(it=><><label for={it}>{[it[0].toUpperCase(), ...it.substring(1)]}</label>&nbsp;<input type="text" name={it} id={it} placeholder={d[it]} /></>))}<span onClick={async()=>{
        await axios.put(`http://localhost:8080/api/mod/${params.type}/${params.id}`).then(r=>rut.push(`/${({prod: "products", users: "user", transaction:"transacts"})[type]}`));
    }}>Actualizar</span></div>;
}
export default Modify;