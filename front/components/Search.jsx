"use client";
import { dictionary, labels, order } from "/res/dictionaries";
import TbodyRenderHack from "/components/TbodyRenderHack"
import { useState } from "react";

function removeNonAlphanumericAndDiacritics(str) {
    return str.normalize("NFD").replace(/[^0-9a-z]/gi, '');
} // https://stackoverflow.com/questions/39938539/javascript-filter-similar-strings
const excheque = (thing, simile)=>{
    const looker = removeNonAlphanumericAndDiacritics(thing).toUpperCase(),
        full = removeNonAlphanumericAndDiacritics(simile).toUpperCase();
    return full.indexOf(looker) >= 0;
}

const Search = ({type, lookFor, adm, data})=>{
    const [fil, chFil] = useState(data);
    return <div className="searchArea">
        <input type="text" name="search" id="search" onInput={e => chFil(() => data.filter(el => Array.isArray(lookFor) ? lookFor.reduce((pv, elem) => excheque(e.target.value, el[elem]) ? pv || true : pv, false) : excheque(e.target.value, el[lookFor])))} />
        <table>
            <thead><tr><th>ID</th>{order[type].map(k => <th key={`label_${k}`}>{labels[type][k]}</th>)}</tr></thead>
            <tbody>
                <TbodyRenderHack adm={adm} data={fil} type={type} />
            </tbody>
        </table>
    </div>
};

module.exports = Search;