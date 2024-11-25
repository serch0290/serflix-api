'use strict';
const panoramaDao = require('./panorama.dao');
const json = require('./../configuracion/configuracion.jsons');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const uploads = require('./../configuracion/configuracion.upload');


/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const getListadoPanoramaConfiguracion = async (req, res) => {
  try {
    let params = req.params;
    const response = await panoramaDao.getListadoPanoramaConfiguracion(params);
    res.status(200).send(response);
  } catch (error) {
    log.fatal('Metodo: getListadoPanoramaConfiguracion ' + JSON.stringify(req.params), error);
    res.status(500).send({ error: 'Ocurrió un error al consultar el listado de configuracion del panorama', e: error });
  }
};

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const savePanorama = async (req, res) => {
    try {
      const data = req.body.bd;
      data.nicho = req.params.id;
      let response = {};
  
      if(data._id){
         response = await panoramaDao.patchPanorama(data);
      }else{
         response = await panoramaDao.guardarPanorama(data);
      }
  
      res.status(200).send(response);
    } catch (error) {
        log.fatal('Metodo: savePanorama ' + JSON.stringify(req.params), body);
      res.status(500).send({ error: 'Ocurrió un error al guardar panorama general' + JSON.stringify(req.body), e: error });
    }
  };

module.exports = {
    getListadoPanoramaConfiguracion,
    savePanorama
}