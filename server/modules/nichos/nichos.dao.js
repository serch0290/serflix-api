const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');


const getListadoNichos = params => {
   return models.nicho.find();
}

const guardarNicho = params => {
    return models.nicho.create(params);
}

const consultarNicho = params =>{
    return models.nicho.findOne({_id: params.id});
}

const consultaConfigBD = async params =>{
    return await models.bd.findOne({nicho: params.id});
}

const patchConfigBD = async params =>{
    return await models.bd.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const patchConexionBD = async params =>{
    return await models.bd.findByIdAndUpdate(
        params._id,
        { $set: { conexion: params.conn } },
        { new: true, runValidators: true }
    );
}

const guardarBD = async params =>{
    return models.bd.create(params);
}

const guardarConfiguracionGeneral = params=> {
   return models.general.create(params);
}

const actualizarConfiguracionGeneral = params =>{
    return models.general.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const consultaConfiguracionGeneral = async params => {
    return await models.general.findOne({nicho: params.id});
}

const guardarFuentes = async params =>{
    
    return await models.general.findByIdAndUpdate(
        params.id,
        { $push: { fuentes: params.fuente } },
        { new: true, runValidators: true }
    );
}
 
module.exports = {
    getListadoNichos,
    guardarNicho,
    consultarNicho,
    guardarBD,
    consultaConfigBD,
    patchConfigBD,
    patchConexionBD,
    guardarConfiguracionGeneral,
    consultaConfiguracionGeneral,
    actualizarConfiguracionGeneral,
    guardarFuentes
}
