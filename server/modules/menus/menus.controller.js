/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./menus.dao');


/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
  const saveMenu = async (req, res) => {
    try {
        let data = req.body;
        let response = null;
        if(data._id){
           let campo = { $push: { menu: data.menu } }
           response = await consultas.agregarNuevoMenu({_id: data._id, campo: campo});
        }else{
          let menu = {
            nicho: data.nicho,
            menu: [data.menu]
          }
          response = await consultas.guardarMenu(menu);
        }
        res.status(200).send(response);
    } catch (error) {
      log.fatal('Metodo: saveMenu ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al guardar el menú', e: error });
    }
  };

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const getMenu = async (req, res) => {
    try {
      const response = await consultas.getMenu(req.params);
      res.status(200).send(response);
    } catch (error) {
      console.log('error: ', error);
      res.status(500).send({ error: 'Ocurrió un error al consultar el menú', e: error });
    }
  };

  module.exports = {
    saveMenu,
    getMenu
  }