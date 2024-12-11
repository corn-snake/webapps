"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const AddButton = ({ type }) => {
    const [adm, sAdm] = useState(false);
    const [fin, sFin] = useState("");
    axios.get("http://localhost:8080/api/login/checkAdmin").then(d => sAdm(d.data));
    useEffect(() => sFin(adm ?
        <tr><td><button onClick={() => redirect(`/add/${type}`)}>+ A&ntilde;adir</button></td></tr>
        : ""), [adm]);
    return <>{fin}</>;
};
export default AddButton;