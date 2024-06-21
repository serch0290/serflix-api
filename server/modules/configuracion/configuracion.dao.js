const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');

const consultaFileRepositorio = async params => {
    return await models.files.find(params);
}


module.exports = {
    consultaFileRepositorio
}