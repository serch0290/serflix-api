const filesDao = require('./files.dao');

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
const getListadoFiles = async (req, res) => {
    try {
      const response = await filesDao.listadoFiles();
      res.status(200).send(response);
    } catch (error) {
      log.fatal('Metodo: getListadoFiles ' + JSON.stringify(req.params), error);
      res.status(500).send({ error: 'Ocurrió un error al consultar el listado de files', e: error });
    }
  };

  /**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const saveFile = async (req, res) => {
  try {
    const response = await filesDao.guardarFile(req.body);
    res.status(200).send(response);
  } catch (error) {
    log.fatal('Metodo: saveFile ' + JSON.stringify(req.body), error);
    res.status(500).send({ error: 'Ocurrió un error al guardar el archivo', e: error });
  }
};

/**
 * 
 * Se sube el file al repositorio local del repositorio central
 * @param {*} res 
 */
const subirFileRepo = async(req, res) =>{
  try{
    const command = req.body.command;
    await uploads.subirCarpetasPruebas(command);
    let file = await filesDao.actualizarFile(req.body.campo);
    res.status(200).send(file);
  }catch(error){
    log.fatal('Metodo: saveFile ' + JSON.stringify(req.body), error);
    res.status(500).send({ error: 'Ocurrió un error al subir los datos', e: error });
  }
}

module.exports = {
    getListadoFiles,
    saveFile,
    subirFileRepo
}