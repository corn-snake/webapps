"use client";

import { hide, labels, modLabels } from "/res/dictionaries";

const ClientHideHack = ({i, dat, type})=>{
    const corType = type == "transaction" || type == "receipt" ? "receipt" : type + "s";
    return <><label htmlFor={`${i}_pre`}>{labels[corType][i] ?? modLabels[corType][i]}</label><input name={`${i}_pre`} id={`${i}_pre`} placeholder={dat} onInput={()=>document.getElementById(i).value = hide.formulae[type][i]} />
        <span className="hiddenInput"><input type="text" name={i} id={i} /></span>
        </>;
}
export default ClientHideHack;