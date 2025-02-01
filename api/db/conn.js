import mongoose from "npm:mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/${Deno.env.get("DB")}`).then(()=>console.log(`Connected to ${Deno.env.get("DB")}`));

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
        })]
    }),
    User = mongoose.model("usuarios", UserSch);

export {User};
