const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');


const getListadoPanoramaConfiguracion = params => {
   return models.panorama.find({nicho: params.id});
}

const guardarPanorama = params => {
    return models.panorama.create(params);
}

const actualizarPanorama = async params =>{
    return await models.panorama.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}
 
module.exports = {
    getListadoPanoramaConfiguracion,
    guardarPanorama,
    actualizarPanorama
}