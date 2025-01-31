"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const ReviveButton = ({itid, prod})=>{
    const r = useRouter();
    return <button onClick={()=>axios.patch("http://localhost:8080/api/revive/receipt", { id: parseInt(itid), idProducto: prod }).then(d=>r.refresh())}>Reafirmar</button>
};
export default ReviveButton;