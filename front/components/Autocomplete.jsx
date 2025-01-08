"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { labels, modLabels } from "/res/dictionaries";

const getAuto = async (type, thing, startsWith, inDB)=>{
    if (startsWith == "") return (await axios.get(`http://localhost:8080/api/read/all/${inDB}s`)).data
    return (await axios.post(`http://localhost:8080/api/search/${inDB}/${thing}`, {txt: startsWith})).data
}

const Autocomplete = ({type, lookFor, inDB, nameAs, local})=>{
    const [cur, altCur] = useState([]),
        [focus, chFocus] = useState(false),
        [first, chFirst] = useState(false);
    useEffect(()=>()=>getAuto(type, lookFor,"",inDB).then(d=>altCur(()=>d)),[first])
    return <>
        <label htmlFor={nameAs}>{labels[type == "transaction" ? "receipt" : type + "s"][nameAs] || modLabels[type][nameAs]}</label>
        <div onFocus={e=>chFocus(()=>true) && chFirst(()=>true)}>
            <input type="text" name={nameAs} id={nameAs} onInput={e=>getAuto(type, lookFor, e.target.value, inDB).then(d=>altCur(()=>d))} />
            <ul className="autoCorRes" hidden={!focus}>
                {cur.map(e=><li key={e.id} onClick={ev=>ev.target.parentElement.parentElement.children[0].value = e.id}>{e[lookFor]}</li>)}
            </ul>
        </div>
    </>
}
export default Autocomplete;