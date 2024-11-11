const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');

const consultaAutores = async params => {
    return await models.autor.find().lean();
}

const guardarAutores = async params =>{
    return await models.autor.create(params);
}

const actualizarActor = async params =>{
    return await models.autor.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

module.exports = {
    consultaAutores,
    guardarAutores,
    actualizarActor
}