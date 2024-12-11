import NoDice from "/components/NoDice";

const { default: axios } = require("axios");

const Users = async () => await axios.get("http://localhost:8080/api/login/checkAdmin").then(d => d.data) ? <span>placeholder</span> : <span><NoDice /></span>;
export default Users;