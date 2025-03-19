import axios from 'axios';
import { headers } from 'next/headers';
import Link from 'next/link';
import Logout from './Logout';
const Topbar = async({params}) => <header className="tophead">
    <Link href="/" id='home'>Home</Link>
    <nav>
        <Link href="/users">Usuarios</Link>
    </nav>
    {await axios.get("http://localhost:80/api/login/check", { headers: { "cookie": (await headers()).get("cookie") } }).then(d => d.data) ? <Logout/> : ""}
</header>
export default Topbar;