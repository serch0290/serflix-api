/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const consultas  = require('./footer.dao');
const json = require('./../configuracion/configuracion.jsons');
const uploads = require('./../configuracion/configuracion.upload');
const versionDao = require('./../version/version.dao');

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
  const saveFooter = async (req, res) => {
    try {
        let data = req.body;
        let response = null;
        let path = null;

        let version = data.footer.version.local;
        if([data.footer.version.local, data.footer.version.dev].every(val => val === version)){
            ++version;
            data.footer.version.local = version;
        }

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

        //generamos el archivo json de la sección que se genero
        if(data.footer.json){
           path = 'server/nichos/' + req.body.nombre + '/assets/json/' + data.footer.fileJson + '_' + data.footer.version.local + '.json';
           json.generarJsonNoticia(data.breadcrumb, path);
        }

        let versionDao1 = await versionDao.getVersion({id: data.nicho});
        let versionFooter = versionDao1.footer.version.local;
        if([versionDao1.footer.version.local, versionDao1.footer.version.dev].every(val => val === versionFooter)){
            ++versionFooter;
            versionDao.actualizarVersion({_id: versionDao1._id, $set : {
              'footer.version.local': versionFooter
              }
             });
        }

        //Generamos el json de la pagina del menu
        path = 'server/nichos/' + req.body.nombre + '/assets/json/footer_'+versionFooter+'.json';
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
            for(let command of req.body.comandos){
                await uploads.subirCarpetasPruebas(command);
            }
            
            let categoria = await consultas.agregarNuevoFooter({_id: id, campo: req.body.campo});
            res.status(200).send({categoria, msj: 'Se subio archivo de footer a pruebas'});
        }catch(error){
          log.fatal('Metodo: subirModificacionesMenu', error);
          res.status(500).send({ error: 'Ocurrió un error al subir modificaciones del footer a dev o prod' });
        }
   }

   const actualizarFooter = async(req, res) =>{
      try{
        let data = req.body;
        data.footer.local = true;
        data.footer.dev =  false;
        data.footer.prod = false;
        let response = await consultas.agregarNuevoFooter({_id: data.footer._id, campo: data.footer});

         //generamos el archivo json de la sección que se genero
         if(data.selected.json){
          path = 'server/nichos/' + req.body.nombre + '/assets/json/' + data.selected.fileJson;
          json.generarJsonNoticia(data.breadcrumb, path);
       }

       //Generamos el json de la pagina del menu
       path = 'server/nichos/' + req.body.nombre + '/assets/json/footer.json';
       json.generarJsonNoticia(response.footer, path);

       res.status(200).send(response);
      }catch(error){
       log.fatal('Metodo: actualizarFooter ' + JSON.stringify(req.body), error);
        res.status(500).send({ error: 'Ocurrió un error al actualizar el footer', e: error });
      }
   }
    

  module.exports = {
    saveFooter,
    getFooter,
    subirModificacionesMenu,
    actualizarFooter
  }
