/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./menus.dao');
const json = require('./../configuracion/configuracion.jsons');
const uploads = require('./../configuracion/configuracion.upload');
const versionDao = require('./../version/version.dao');

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


       let { menu, _id } = await versionDao.getVersion({id: data.nicho});
        let versionMenu = menu.local;
        if([menu.local, menu.dev].every(val => val === versionMenu)){
            ++versionMenu;
            versionDao.actualizarVersion({_id: _id, $set : {
              'menu.local': versionMenu
              }
             });
        }

        //Generamos el json de la pagina del menu
        let path = 'server/nichos/' + req.body.nombre + '/assets/json/menu_'+versionMenu+'.json';
        json.generarJsonNoticia(response.menu, path);

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
		for(let command of req.body.comandos){
        await uploads.subirCarpetasPruebas(command);
    }

    let { menu, _id } = await versionDao.getVersion({id: req.body.nicho});

    let versionMenu = menu.local;
    versionDao.actualizarVersion({_id: _id, $set : {
      'menu.dev': versionMenu
      }
    });
		
		let menus = await consultas.agregarNuevoMenu({_id: id, campo: req.body.campo});
	  res.status(200).send({menus, msj: 'Se subio archivo de menú a pruebas'});
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