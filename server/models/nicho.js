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
    server: String,
    username: String,
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
   jsonLogoIco : {
     local: Boolean,
     dev: Boolean, 
     prod: Boolean
   },
   routing:{
    local: Boolean,
    dev: Boolean, 
    prod: Boolean
   },
   nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' } 
});

const general =  mongoose.model('General', generalSchema);

const filesSchema =  new Schema({
    file: String,
    dynamic: Boolean,
    tipo: Number,
    path: String,
    repo: Boolean,
    local: Boolean,
    dev: Boolean, 
    prod: Boolean,
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
    idCategoria: Number,
    title: String,
    breadcrumb: {type: Schema.Types.Mixed},
    noticiasLateral: {
        title: String
    },
    intereses: {
        title: String
    },
    local: Boolean,
    dev: Boolean,
    prod: Boolean,
    version: {
        local: {type: Number, default: 0},
        dev: {type: Number, default: 0},
        pro: {type: Number, default: 0}
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
    idNoticia: Number,
    author: {type: Schema.Types.Mixed},
    detalle: {type: [Schema.Types.Mixed]},
    redesSociales: {
        type: Schema.Types.Mixed
    },
    local: Boolean,
    dev: Boolean,
    prod: Boolean,
    IDNoticiasEnlazado: String,
    IDNoticiasRelacionadas: String,
    publicado: {
        dev: Boolean,
        prod: Boolean
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    version: {
        local: {type: Number, default: 0},
        dev: {type: Number, default: 0},
        pro: {type: Number, default: 0}
    },
    fechaModificacion: Date,
    noticiasLateral: { type: Schema.Types.Mixed },
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

const shcemaMenu = new Schema({
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' },
    local: Boolean,
    dev: Boolean,
    prod: Boolean,
    menu: {type: [Schema.Types.Mixed]}
});

const menu = mongoose.model('menu', shcemaMenu);

const schemaFooter = new Schema({
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' },
    local: Boolean,
    dev: Boolean,
    prod: Boolean,
    footer: {type: [Schema.Types.Mixed]}
});

const footer = mongoose.model('footer', schemaFooter);

const schemaAutor = new Schema({
    autor: String,
    descripcion: String,
    descripcionLarga: String,
    home: Boolean,
    sobremi: Boolean,
    ambiente:{
      local: Boolean,
      dev: Boolean,
      prod: Boolean,
    },
    breadcrumb: {type: [Schema.Types.Mixed]},
    img: String,
    img400: String,
    img800: String,
    img1024: String
});

const autor = mongoose.model('autor', schemaAutor);

const schemaPrivacidad = new Schema({
    breadcrumb: {type: [Schema.Types.Mixed]},
    texto: String,
    tipo: Number,
    local: Boolean,
    dev: Boolean,
    prod: Boolean,
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' },
    json: String,
    h1: String
});

const privacidad = mongoose.model('privacidad', schemaPrivacidad);

const schemaPanorama = new Schema({
   nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' },
   home: {
     local: Boolean,
     dev: Boolean
   }
});

const panorama = mongoose.model('panorama', schemaPanorama);

const schemaVersion = new Schema({
    nicho: { type: Schema.Types.ObjectId, ref: 'Nicho' },
    menu: {
        local: { type: Number, default: 0},
        dev: { type: Number, default: 0},
        prod: { type: Number, default: 0}
    },
    footer: {
        local: { type: Number, default: 0},
        dev: { type: Number, default: 0},
        prod: { type: Number, default: 0}
    }
});

const version = mongoose.model('version', schemaVersion);


module.exports = {
    nicho,
    bd,
    general,
    files,
    categoria,
    noticia,
    home,
    buscador,
    menu,
    footer,
    autor,
    privacidad,
    panorama,
    version
}