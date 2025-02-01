import { User } from "../conn.js";

const showAll = ()=>User.find({}),
    showId = id=>User.findById(id);

export {showAll, showId};