/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./privacidad.dao');

const json = require('./../configuracion/configuracion.jsons');
const uploads = require('./../configuracion/configuracion.upload');

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
  const savePrivacidad = async (req, res) => {
    try {
        let data = req.body.privacidad;
        let response = null;
        let path = null;
        if(data._id){
           response = await consultas.actualizarPrivacidad({_id: data._id, campo: data});
        }else{
           response = await consultas.guardarPrivacidad(data);
        }

        let version = response.version.local;
        if([response.version.local, response.version.dev].every(val => val === version)){
            ++version;
            await consultas.actualizarPrivacidad({_id: response._id, $set : {
                'version.local': version
              }
            });
        }

        //generamos el archivo json de la sección que se genero
        path = 'server/nichos/' + req.body.nombre + '/assets/json/' + data.json + '_' + version + '.json';
        json.generarJsonNoticia(data, path);

        res.status(200).send(response);
    } catch (error) {
      log.fatal('Metodo: savePrivacidad ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al guardar la privacidad', e: error });
    }
  };

  /**
  *
  * @author Sergio Cruz Flores
  * @returns {object} objeto con los datos del menu
  */
  const getPrivacidad = async (req, res) => {
    try {
      let response = await consultas.getPrivacidad(req.params);
      res.status(200).send(response);
    } catch (error) {
      log.fatal('Metodo: getPrivacidad ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al consultar la privacidad', e: error });
    }
  };


  /**
   *
   * @author Sergio Cruz Flores
   * @returns Se sube objeto de menú a pruebas
   */
  const subirModificacionesPrivacidad = async(req, res) =>{
    try{
        let id = req.params.id;
        for(let command of req.body.comandos){
            await uploads.subirCarpetasPruebas(command);
        }
        
        let privacidad = await consultas.actualizarPrivacidad({_id: id, campo: req.body.campo});
        res.status(200).send({privacidad, msj: 'Se subio archivo de privacidad a pruebas'});
    }catch(error){
      log.fatal('Metodo: subirModificacionesPrivacidad', error);
      res.status(500).send({ error: 'Ocurrió un error al subir modificaciones de privacidad a dev o prod' });
    }
}


  module.exports = {
    savePrivacidad,
    getPrivacidad,
    subirModificacionesPrivacidad
  }