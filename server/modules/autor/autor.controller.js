const consultas = require('./autor.dao');
const json = require('./../configuracion/configuracion.jsons');
const uploads = require('./../configuracion/configuracion.upload');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const getListadoAutores = async(req, res) =>{
    
    try{
        let autores = await consultas.consultaAutores(req.params);
        res.status(200).send(autores);
    }catch(error){
       log.fatal('Metodo: getCategoriaDetalle ' + JSON.stringify(req.params), error);
       res.status(500).send({ error: 'Ocurrió un error al consultar los autores' });
    }
 }

/**
 * 
 * Se guarda autor
 */
const saveAutores = async(req, res) =>{
    try{
        let data = req.body.autor;
        let autor = null;
        if(data._id){
           autor = await consultas.actualizarActor(data);
        }else{
           autor = await consultas.guardarAutores(data);
        }

        if(data.home){
            let homeAutor = {
                img: req.body.nicho.dominio + '/assets/images/' + autor.img,
                title: 'Acerca de nosotros',
                descripcion: autor.descripcion
            }

            let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/about-us.json';
            json.generarJsonNoticia(homeAutor, path);
        }

        if(data.sobremi){
            let sobreMi = {
                breadcrumb: autor.breadcrumb,
                name: autor.autor,
                img: req.body.nicho.dominio + '/assets/images/' + autor.img,
                title: 'Acerca de Mi',
                descripcion: autor.descripcionLarga
            }

            let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/sobre-mi.json';
            json.generarJsonNoticia(sobreMi, path);
        }
        res.status(200).send(autor);
    }catch(error){
       log.fatal('Metodo: saveAutores ' + JSON.stringify(req.body), error);
       res.status(500).send({ error: 'Ocurrió un error al guardar autores' });
    }
 }

 /**
 * Se sube datos al ambiente de DEV y se actualiza en bd
 */
const actualizarCamposBDDev = async(req, res)=>{
    try{
      const commands = req.body.commands;
      for(let comand of commands){
          await uploads.subirCarpetasPruebas(comand);
      }
  
      const campo = req.body.campo;
      let autor = await consultas.actualizarActor(campo);
      res.status(200).send({autor, msj: 'Se subieron los archivos del autor'});						
    }catch(error){
      log.fatal('Metodo: actualizarCamposBDDev ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al subir los archivos del autor', e: error });
    }
  }

module.exports = {
    getListadoAutores,
    saveAutores,
    actualizarCamposBDDev
}