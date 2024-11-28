'use strict';
const versionDao = require('./version.dao');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const getVersionesNicho = async (req, res) => {
  try {
    let params = req.params;
    const response = await versionDao.getVersion(params);
    res.status(200).send(response);
  } catch (error) {
    log.fatal('Metodo: getVersionesNicho ' + JSON.stringify(req.params), error);
    res.status(500).send({ error: 'Ocurrió un error al consultar las versiones del nicho', e: error });
  }
};


module.exports = {
    getVersionesNicho
}