"use client";
import axios from "axios";
import { modOrder, modFuncs } from "/res/dictionaries";
import { useRouter } from "next/navigation";

const UpdateButton = ({del, type, itid, db, todo})=>{
    const r = useRouter();
    const getNews = () => modOrder[type].reduce((p,i) => {
        if (document.getElementById(i).value !== "")
            p[i] = modFuncs[type][i] ? modFuncs[type][i](document.getElementById(i).value) : document.getElementById(i).value;
        return p;
    }, {id: parseInt(itid)});
    if (del) return <span className="fakeButton" onClick={ () => axios.delete(`http://localhost:8080/api/del/${type}/${itid}`).then(db ? r.refresh : r.back)}>Eliminar</span>
    return <span className="fakeButton" onClick={ () => axios.patch(`http://localhost:8080/api/mod/${type}`, getNews()).then(r.back)} >Actualizar</span>
}
export default UpdateButton;