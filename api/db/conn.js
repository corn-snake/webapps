import mongoose from "npm:mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/${Deno.env.get("DB")}`, {
    connectTimeoutMS: 1500,
    heartbeatFrequencyMS: 5000
}).then(()=>console.log(`Connected to ${Deno.env.get("DB")}`)).catch(e=>console.log(`Not connected - ${e}`));

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

export {User};
