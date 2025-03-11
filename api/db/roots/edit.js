import { User } from "../conn.js";
import crypto from "node:crypto";

const emptyHash = crypto.hash("sha512", "default");

export const _editUser = (id,query)=>User.findByIdAndUpdate(id, query, {new: true});

export const _toggleUserPrivilege = (id)=> User.findById(id).then(u=>User.findByIdAndUpdate(id, {
    status: u.status == "admin" ? "usuario" : "admin"
}, {new: true}));

export const _addPwd = (id, body) => {
    const salt = crypto.randomBytes(32).toString("hex");
    return User.findByIdAndUpdate(id, {
        salt,
        pwd: crypto.scryptSync(body.pwd || emptyHash, salt, 64, "sha512").toString("hex")
    }, {new: true});
}