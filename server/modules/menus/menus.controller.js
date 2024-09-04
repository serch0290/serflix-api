/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./menu.dao');


/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
  const saveMenu = async (req, res) => {
    try {
        const response = await consultas.guardarMenu(req.body);
      res.status(200).send(response);
    } catch (error) {
      log.fatal('Metodo: saveMenu ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al guardar el menú', e: error });
    }
  };

  module.exports = {
    saveMenu
  }