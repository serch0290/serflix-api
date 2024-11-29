const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');

const consultaAutores = async params => {
    return await models.autor.find().lean();
}

const getAutorNicho = async params => {
    return await models.autorNicho.findOne({nicho: params.id }).lean();
}

const guardarAutores = async params =>{
    return await models.autor.create(params);
}

const actualizarActor = async params =>{
    return await models.autor.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const actualizarNichoAutor = async params =>{
    return await models.autorNicho.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const guardarNichoAutor = async params =>{
    return await models.autorNicho.create(params);
}

const actualizarEstatus = async params =>{
   return models.autorNicho.updateMany({}, { $set: { home: false } });
}

module.exports = {
    consultaAutores,
    guardarAutores,
    actualizarActor,
    actualizarEstatus,
    actualizarNichoAutor,
    guardarNichoAutor,
    getAutorNicho
}