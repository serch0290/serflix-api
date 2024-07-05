const conexion = require('../../lib/conexion-mongo');
const models = require('../../models/nicho');

const guardarCategoriaBlog = async params => {
    return await models.categoria.create(params);
}

const consultaListadoCategorias = async params =>{
    return await models.categoria.find({nicho: params.id}).lean();
}

const consultaListadoNoticias = async params =>{
    return await models.noticia.find({categoria: params.id})
}

const consultaCategoriaById = async params =>{
    return await models.categoria.findOne({_id: params.id})
}

const guardarNoticia = async params=>{
    return await models.noticia.create(params);
}

const consultaNoticiaById = async params =>{
    return await models.noticia.findOne({_id: params.id})
}

const actualizarNoticia = async params =>{
    return await models.noticia.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

module.exports = {
    guardarCategoriaBlog,
    consultaListadoCategorias,
    consultaListadoNoticias,
    consultaCategoriaById,
    guardarNoticia,
    consultaNoticiaById,
    actualizarNoticia
}