const crypto = require("crypto");
const mongoose = require("mongoose");
const { env } = require("process");

mongoose.connect(`mongodb://127.0.0.1:27017/${env.DB}`, {
    connectTimeoutMS: 1500,
    heartbeatFrequencyMS: 5000
}).then(() => console.log(`Connected to ${env.DB}`)).catch(e => console.log(`Not connected - ${e}`));

const Schema = mongoose.Schema,
    UserSch = new Schema({
        _id: String,
        twitter: String,
        nombre: String,
        descripcion: String,
        telefono: Schema.Types.Mixed,
        direccion: [new Schema({
            calle: String,
            num: Schema.Types.Mixed,
            cd: String,
            cp: String
        })],
        status: String,
        salt: String,
        pwd: String,
        logged: Boolean
    }),
    User = mongoose.model("usuarios", UserSch);

const _editUser = (id, query) => User.findByIdAndUpdate(id, query, { new: true });
const changeUser = (query) => _editUser(query.nombre, query);
const userExists = async(nombre)=>await User.findOne({nombre}) ?? false;

const getUser = (nombre) =>User.findOne({nombre}),
    getUserId = (_id)=>User.findOne({_id}),
    getAllUsers = ()=> User.find(),
    online = () => User.find({ logged: true }),
    isOnline = (nombre) => User.findOne({ nombre }).then(u => u.logged ?? false);
const makeUser = (body) =>{
    const s = crypto.randomBytes(32).toString("hex");
    const pwd = crypto.scryptSync(body.pwd ?? crypto.createHash("sha512").update("default").digest("hex"), s, 64, "sha512").toString("hex");
    return User.create({
        ...body,
        salt: s,
        pwd,
        _id: body._id ?? new mongoose.Types.ObjectId()
    });
};
const editUser = (nombre, params) => User.findOneAndUpdate({nombre}, params),
    togglePrivilege = async (nombre) => (await User.findOne({nombre})).status == "admin" ?
        await User.updateOne({nombre},{status: "user"})
        : await User.updateOne({nombre}, {status:"admin"});
const deleteUser = (nombre)=> User.deleteOne({nombre});

module.exports = { User, userExists, online, isOnline, getUser, getAllUsers, makeUser, editUser, deleteUser, togglePrivilege, getUserId };