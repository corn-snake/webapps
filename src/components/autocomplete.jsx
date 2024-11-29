import { useState } from "react";
import axios from "axios";

export default function Autocomplete({type}){
    const [opts, setOpts] = useState([]),
    [asel, setSel] = useState(0);

    async function autocomp(type) {
        const val = document.getElementById(`inp_${type}`).value;
        setOpts((await axios.post(
            "http://localhost:3000/"
            + ({usuario: "u/",
                producto: "p/"
            })[type]
            + "autocompletar",
            {hint: val}
        )).data);
    }

    function changeVal (val){
        return function () {
            document.getElementById(`inp_${type}`).value = val;
            setOpts([]);
        }
    }

    return <div class="autocomp">
        <input className="form-control" required type="text" id={`inp_${type}`}
            onInput={()=>autocomp(type)}
            onKeyDown={e=>{
                if (e.key == "ArrowDown"){
                    document.getElementById(`inp_${type}_auto`).children[asel].classList.remove("cur");
                    if (opts.length - 1 == asel)
                        setSel(0);
                    else
                        setSel(asel+1);
                    document.getElementById(`inp_${type}_auto`).children[asel].classList.add("cur");
                }
                if (e.key == "ArrowUp") {
                    document.getElementById(`inp_${type}_auto`).children[asel].classList.remove("cur");
                    if (asel==0)
                        setSel(opts.length - 1);
                    else
                        setSel(asel - 1);
                    document.getElementById(`inp_${type}_auto`).children[asel].classList.add("cur");
                }
            }}
            />
        <div class="autocomp_attached" id={`inp_${type}_auto`}>
            {opts.filter(e=>e!="").map(e=><p onClick={changeVal(e)}>{e}</p>)}
        </div>
        <style>
            .autocomp_attached .cur {
                background:rgb(157, 142, 239);
            }
        </style>
    </div>
}