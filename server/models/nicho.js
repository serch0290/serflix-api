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
   background: String,
   filesProyecto: Boolean,
   logo: String,
   icon: String,
   nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' } 
});

const general =  mongoose.model('General', generalSchema);

module.exports = {
    nicho,
    bd,
    general
}