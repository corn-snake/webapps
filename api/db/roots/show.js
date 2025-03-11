import { User } from "../conn.js";

const showAll = ()=>User.find({}),
    showId = id=>User.findById(id),
    online = ()=>User.find({logged: true}),
    isOnline = (nombre)=>User.findOne({nombre}).then(u=>u.logged ?? false);

export {showAll, showId, online, isOnline};