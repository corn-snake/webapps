import axios from "axios";
import NoDice from "/components/NoDice";
import { headers } from "next/headers";
import UpdateButton from "/components/UpdateButton";
import { dictionary, labels, modOrder, modLabels } from "/res/dictionaries";

const Add = async({params})=>{
    const h = await headers(),
        p = await(await params),
        adm = await axios.get("http://localhost:8080/api/login/checkAdmin", { headers: { "cookie": h.get("cookie") } }).then(d => d.data);
    if (!(await adm)) return <NoDice />
    return <div className="modifier">
        {}
    </div>
};
export default Add;