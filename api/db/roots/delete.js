import { User } from "../conn.js";

export const _delUser = id=>User.findByIdAndDelete(id);