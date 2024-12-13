"use client";

import { hide } from "/res/dictionaries";

const ClientHideHack = ({i, dat, type})=>{
    return <><label htmlFor={`${i}_pre`} /><input name={`${i}_pre`} id={`${i}_pre`} placeholder={dat} onInput={()=>document.getElementById(i).value = hide.formulae[type][i]} />
        <span class="hiddenInput"><input type="text" name={i} id={i} /></span>
        </>;
}
export default ClientHideHack;