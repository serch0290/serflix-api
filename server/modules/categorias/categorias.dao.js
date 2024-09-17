const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');

const consultaCategoriaById = async params => {
    return await models.categoria.findOne({_id: params.id}).lean();
}

module.exports = {
    consultaCategoriaById
}