"use client";
import { useEffect, useState } from "react";
import NoDice from "/components/NoDice";

const { default: axios } = require("axios");

const Transacts = () =>{
    const [adm, sAdm] = useState(false);
    const [data, sData] = useState({});
    const [col, sCol] = useState([<span key="place"><NoDice /></span>]);
    axios.get("http://localhost:8080/api/login/checkAdmin").then(d => d.data).then(d=>sAdm(d));
    useEffect(()=>{axios.get("http://localhost:8080/api/all/transactions").then(d=>d.data).then(d=>sData(d))}, [adm]);
    useEffect(()=>
        sCol(()=><ul>
            {Object.keys(data).map(i => <li key={i}>
                {parseInt(i) + 1}a compra, por el usuario #{data[i][0].idUsuario}<br />
                <i>Hecha el {(new Date(data[i][0].date.seconds * 1000)).toLocaleDateString("es-MX")}</i><br />
                Incluye:
                <ul>{data[i].map(pr => <li key={pr.idProducto}>
                    {pr.amount} del prod. n&uacute;m. {pr.idProducto}
                </li>)}</ul>
            </li>)}
        </ul>)
    ,[data])
    return <><h1>Compras completadas:</h1>{col}</>;
};
export default Transacts;