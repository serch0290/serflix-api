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
    estructura: Boolean,
    ambiente: {
        local: Boolean,
        dev: Boolean,
        prod: Boolean
    },
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' } 
});

const bd =  mongoose.model('BD', conexionSchema);

const generalSchema = new Schema({
   dominio: String,
   carpetas: {
     dev: Boolean,
     prod: Boolean,
     local: Boolean
   },
   fuentes: [{
      file: String,
      name: String,
      negrita: Boolean
   }],
   background: {
    value: String,
    local: Boolean,
    dev: Boolean,
    prod: Boolean
   },
   filesProyecto: {
    local: Boolean,
    dev: Boolean,
    prod: Boolean
   },
   logo: {file: String, 
          fileCMS: String, 
          local: Boolean,
          dev: Boolean,
          prod: Boolean},
   icon: {file: String, 
          fileCMS: String,
          local: Boolean,
          dev: Boolean,
          prod: Boolean},
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

const categoriaSchema = new Schema({
    h1: String,
    menu: Boolean,
    home: Boolean,
    url: String,
    idSQL: Number,
    title: String,
    breadcrumb: {type: Schema.Types.Mixed},
    noticiasLateral: {
        title: String
    },
    intereses: {
        title: String
    },
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' } 
});

const categoria = mongoose.model('Categorias', categoriaSchema);

const noticiaSchema = new Schema({
    breadcrumb: {type: Schema.Types.Mixed},
    nombre: String,
    descripcion: String,
    url: String,
    estatusPublicacion: Number,
    h1: String,
    comentarios: Boolean,
    portada: Boolean,
    idSQL: Number,
    author: {type: Schema.Types.Mixed},
    detalle: {type: [Schema.Types.Mixed]},
    redesSociales: {
        type: Schema.Types.Mixed
    },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categorias' } 
});

const noticia = mongoose.model('Noticias', noticiaSchema);


const homeSchema = new Schema({
   h1: String,
   noticias_style1: {
    type: Schema.Types.Mixed
   },
   paginador: Boolean,
   categoria: { type: Schema.Types.ObjectId, ref: 'Categorias' } 
})

const home = mongoose.model('Home', homeSchema);

const schemaBuscador = new Schema({
    noticias_style1: {
        type: Schema.Types.Mixed
    },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categorias' } 
});

const buscador = mongoose.model('Buscador', schemaBuscador);

module.exports = {
    nicho,
    bd,
    general,
    files,
    categoria,
    noticia,
    home,
    buscador
}