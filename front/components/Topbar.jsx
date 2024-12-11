import Link from 'next/link';
const Topbar = ({params}) => <header className="tophead">
    <Link href="/" id='home'>Shopfront</Link>
    <nav>
        <Link href="/users">Usuarios</Link>
        <Link href="/products">Productos</Link>
        <Link href="/transacts">Ventas</Link>
    </nav>
</header>
export default Topbar;