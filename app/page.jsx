import axios from "axios";
import UserCard from "../components/UserCard";

const Page = async()=>await axios.get("https://jsonplaceholder.typicode.com/users").then(a=>a.data).then(ds=>ds.map(d=><UserCard uid={d.id} name={d.name} uname={d.username} email={d.email} full={d} />));
export default Page;