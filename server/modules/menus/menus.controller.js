/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./menus.dao');
const json = require('./../configuracion/configuracion.jsons');

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
           let campo = { 
            $push: { menu: data.menu },
            local: true,
            dev: false,
            prod: false
         }
           response = await consultas.agregarNuevoMenu({_id: data._id, campo: campo});
        }else{
          let menu = {
            nicho: data.nicho,
            menu: [data.menu],
            local: true,
            dev: false,
            prod: false
          }
          response = await consultas.guardarMenu(menu);
        }

        let menu = {
            name: response.name,
            url: response.url
        }

        //Generamos el json de la pagina del menu
        let path = 'server/nichos/' + req.body.nombre + '/assets/json/menu.json';
        json.generarJsonNoticia(menu, path);

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

  /**
 *
 * @author Sergio Cruz Flores
 * @returns Se sube objeto de menú a pruebas
 */
  const subirModificacionesMenu = async(req, res) =>{
	try{
        let id = req.params.id;
		for(let command of req.body.commands){
            await uploads.subirCarpetasPruebas(command);
        }
		
		let categoria = await consultas.agregarNuevoMenu({_id: id, campo: req.body.campo});
	    res.status(200).send({categoria, msj: 'Se subio archivo de menú a pruebas'});
	}catch(error){
	  log.fatal('Metodo: subirModificacionesMenu', error);
	  res.status(500).send({ error: 'Ocurrió un error al subir modificaciones del menu a dev o prod' });
	}
}

  module.exports = {
    saveMenu,
    getMenu,
    subirModificacionesMenu
  }