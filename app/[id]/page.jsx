import axios from "axios";
import Link from "next/link";

const User = async ({params}) => <>
    <article className="card half_padding">
        {await axios.get(`https://jsonplaceholder.typicode.com/users/${(await params).id}`).then(d=>d.data).then(d=><UserData main={true} d={d}/>)}
    </article>
    <footer>
        <Link href="/">&lt; Regresar</Link>
    </footer>
</>;
export default User;

const UserData = ({main=false, k, d})=>{
    if (d && (main || typeof d !== "string")) return Object.keys(d).map(item=><UserData k={item} d={d[item]}/>);
    return <span>{k}: {d}</span>
};