const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nichoSchema = new Schema({
    nombre: String,
    descripcion: String,
    estatus: {
        type: Boolean,
        default: true
    }
});

const nicho = mongoose.model('Nicho', nichoSchema);

const conexionSchema = new Schema({
    host: String,
    usuario: String,
    password: String,
    database: String,
    conexion: Boolean,
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' } 
});

const bd =  mongoose.model('BD', conexionSchema);

const generalSchema = new Schema({
   dominio: String,
   carpetas: Boolean,
   fuentes: [{
      file: String,
      name: String
   }],
   background: String,
   filesProyecto: Boolean,
   logo: String,
   icon: String,
   nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' } 
});

const general =  mongoose.model('General', generalSchema);

const filesSchema =  new Schema({
    file: String,
    dynamic: Boolean,
    tipo: Number,
    path: String,
    estatus: {
        type: Boolean,
        default: true
    }
});

const files =  mongoose.model('Files', filesSchema);

module.exports = {
    nicho,
    bd,
    general,
    files
}