import { User } from "../conn.js";
export const _editUser = (id,query)=>User.findByIdAndUpdate(id, query);