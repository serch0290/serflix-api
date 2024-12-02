const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');


const getVersion = params => {
    console.log('params version: ', params);
   return models.version.findOne({nicho: params.id});
}

const guardarVersion = params => {
    return models.version.create(params);
}

const actualizarVersion = async params =>{
    return await models.version.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}
 
module.exports = {
    getVersion,
    guardarVersion,
    actualizarVersion
}