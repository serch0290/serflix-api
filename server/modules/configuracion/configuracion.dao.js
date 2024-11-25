const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');

const consultaFileRepositorio = async params => {
    console.log('params: ', params);
    return await models.files.find(params);
}

const guardarLogoNicho = async params =>{
    return await models.general.findByIdAndUpdate(
        params.id,
        { $set: { logo: params.logo } },
        { new: true, runValidators: true }
    );
}

const guardarIconNicho = async params =>{
    return await models.general.findByIdAndUpdate(
        params.id,
        { $set: { icon: params.icon } },
        { new: true, runValidators: true }
    );
}

const actualizacionCamposGeneral = async params =>{
    return await models.general.findByIdAndUpdate(params._id, params.campo, { new: true, runValidators: true });
}

const eliminarConfiguracionGeneral = async params=>{
    return await models.general.deleteOne({_id: params.id});
}

module.exports = {
    consultaFileRepositorio,
    guardarLogoNicho,
    guardarIconNicho,
    actualizacionCamposGeneral,
    eliminarConfiguracionGeneral
}