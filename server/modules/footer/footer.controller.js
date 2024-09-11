/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./footer.dao');
const json = require('./../configuracion/configuracion.jsons');

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
  const saveFooter = async (req, res) => {
    try {
        let data = req.body;
        let response = null;
        if(data._id){
           let campo = { 
              $push: { footer: data.footer },
              local: true,
              dev: false,
              prod: false
           }
           response = await consultas.agregarNuevoFooter({_id: data._id, campo: campo});
        }else{
          let footer = {
            nicho: data.nicho,
            footer: [data.footer],
            local: true,
            dev: false,
            prod: false
          }
          response = await consultas.guardarFooter(footer);
        }

        //Generamos el json de la pagina del menu
        let path = 'server/nichos/' + req.body.nombre + '/assets/json/footer.json';
        json.generarJsonNoticia(response.footer, path);

        res.status(200).send(response);
    } catch (error) {
      log.fatal('Metodo: saveMenu ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al guardar el footer', e: error });
    }
  };

  /**
  *
  * @author Sergio Cruz Flores
  * @returns {object} objeto con los datos del menu
  */
  const getFooter = async (req, res) => {
      try {
        let response = await consultas.getFooter(req.params);
        res.status(200).send(response);
      } catch (error) {
        log.fatal('Metodo: getFooter ' + JSON.stringify(req.body), error);
        res.status(500).send({ error: 'Ocurrió un error al consultar el footer', e: error });
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
            
            let categoria = await consultas.agregarNuevoFooter({_id: id, campo: req.body.campo});
            res.status(200).send({categoria, msj: 'Se subio archivo de footer a pruebas'});
        }catch(error){
          log.fatal('Metodo: subirModificacionesMenu', error);
          res.status(500).send({ error: 'Ocurrió un error al subir modificaciones del footer a dev o prod' });
        }
   }
    

  module.exports = {
    saveFooter,
    getFooter,
    subirModificacionesMenu
  }
