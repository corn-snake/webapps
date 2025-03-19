import axios from "axios";
import NoDice from "/components/NoDice";
import { headers } from "next/headers";
import UpdateButton from "/components/UpdateButton";
import { schema } from "/res/dictionaries";

const Add = async({params})=>{
    const h = await headers(),
        p = await(await params),
        adm = await axios.get("http://localhost:80/api/login/checkAdmin", { headers: { "cookie": h.get("cookie") } }).then(d => d.data);
    if (!(await adm)) return <NoDice />
    return <div className="modifier">
        <form>
            {schema.map(i=><span><label>{i.id}</label><input id={i.id} /></span>)}
        </form>
        <UpdateButton add={true}></UpdateButton>
    </div>
};
export default Add;