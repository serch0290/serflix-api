const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const Nicho = require('../../models/nicho');


const getListadoNichos = params => {
   return Nicho.find();
}

const guardarNicho = params => {
    return Nicho.create(params);
}

const consultarNicho = params =>{
    return Nicho.findOne({_id: params.id});
}

module.exports = {
    getListadoNichos,
    guardarNicho,
    consultarNicho
}
