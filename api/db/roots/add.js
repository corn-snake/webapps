import { User } from "../conn.js";

export const _addUser = query=>User.create(query);