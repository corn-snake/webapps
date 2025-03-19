"use client";

import { useState } from "react";
import { schema } from "/res/dictionaries";
import axios from "axios";

const AddButton = ({ type }) => {
    const [userList, setUserList] = useState([]);
    return <>
        {userList.map((e,i)=><tr key={`add_${i}`} hidden={e.invalid}>
            {schema.map(e=><td key={e.id}><input id={`add_${i}_${e.id}`} onChange={ev=>{userList[i][e.id] = ev.target.value;}} /></td>)}
            <td key={`elim_${i}`}><button onClick={()=>setUserList(e=>{const a = [...userList]; /*no idea why it has to be proxied like this*/ a[i].invalid = true; return a;})}>X</button></td>
        </tr>)}
        <tr><td><button onClick={() =>setUserList(u=>[...u,{}])}>+ A&ntilde;adir</button></td>
        <td>
                <button onClick={()=>userList.filter(Boolean).filter(e => !e.invalid).length > 0 ? userList.filter(Boolean).filter(e=>!e.invalid).every(e=>e.nombre == undefined ?
                        false
                    : axios.post("http://localhost:80/api/create", e)) : ""}>Confirmar</button>
            </td>
        </tr>
    </>;
};
export default AddButton;