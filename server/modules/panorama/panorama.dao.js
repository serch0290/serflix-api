const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');


const getListadoPanoramaConfiguracion = params => {
   return models.panorama.find({nicho: params.id});
}

const guardarPanorama = params => {
    return models.panorama.create(params);
}
 
module.exports = {
    getListadoPanoramaConfiguracion,
    guardarPanorama
}