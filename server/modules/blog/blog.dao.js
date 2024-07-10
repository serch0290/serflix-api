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
    return await models.categoria.findOne({_id: params.id}).lean();
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

const guardarHome = async params =>{
    return await models.home.create(params) 
}

const getHome = async params =>{
    return await models.home.findOne({categoria: params.id}).lean();
}

const actualizarHome = async params =>{
    return await models.home.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const guardarBuscador = async params =>{
    return await models.buscador.create(params); 
}

const actualizarBuscador = async params =>{
    return await models.buscador.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const getBuscador = async params =>{
    return await models.buscador.findOne({categoria: params.id}).lean();
}

module.exports = {
    guardarCategoriaBlog,
    consultaListadoCategorias,
    consultaListadoNoticias,
    consultaCategoriaById,
    guardarNoticia,
    consultaNoticiaById,
    actualizarNoticia,
    guardarHome,
    getHome,
    actualizarHome,
    guardarBuscador,
    actualizarBuscador,
    getBuscador
}