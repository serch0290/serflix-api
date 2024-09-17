const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');

const consultaAutores = async params => {
    return await models.autor.find().lean();
}

const guardarAutores = async params =>{
    return await models.autor.create(params);
}

module.exports = {
    consultaAutores,
    guardarAutores
}