import "./styles.css"
import Topbar from "/components/Topbar";
import Sidebar from "/components/Sidebar";
import ListenRoute from "/components/ThisExistsSolelyToReloadPages";

const RootLayout = ({children}) =>{
    return <html lang="es">
        <head>
            <title>Shopfront</title>
        </head>
        <body>
            <Topbar/>
            <main>{children}</main>
            <Sidebar/>
            <footer>
                <h5>Copyleft 2024, Cornsnake</h5>
            </footer>
            <script type="text/javascript" src="/scripts.js"></script>
            <ListenRoute/>
        </body>
    </html>
}
export default RootLayout;