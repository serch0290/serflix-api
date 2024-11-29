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

 const getAutorNicho = async(req, res) =>{
    
    try{
        let autores = await consultas.getAutorNicho(req.params);
        res.status(200).send(autores);
    }catch(error){
       log.fatal('Metodo: getAutorNicho ' + JSON.stringify(req.params), error);
       res.status(500).send({ error: 'Ocurrió un error al consultar el autori del nicho' });
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

        res.status(200).send(autor);
    }catch(error){
       log.fatal('Metodo: saveAutores ' + JSON.stringify(req.body), error);
       res.status(500).send({ error: 'Ocurrió un error al guardar autores' });
    }
 }

 /**
  * Se asigna un autor para el nicho
  */
 const saveAutorNicho = async(req, res) =>{
    try{
        let autor = req.body.autor, resNichoAutor = null;
        let nichoAutor = req.body.nichoAutor;
        let version = nichoAutor.version.local;


        if([nichoAutor.version.local, nichoAutor.version.dev].every(val => val === version)){
            nichoAutor.version.local = ++version;
        }

        if(nichoAutor._id){
           resNichoAutor = await consultas.actualizarNichoAutor(nichoAutor);
        }else{
           resNichoAutor = await consultas.guardarNichoAutor(nichoAutor);
        }

        if(data.home){
            let homeAutor = {
                img: autor.img400,
                title: 'Acerca de nosotros',
                descripcion: autor.descripcion
            }

            let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/about-us_'+version+'.json';
            json.generarJsonNoticia(homeAutor, path);
        }

        if(data.sobremi){
            let sobreMi = {
                breadcrumb: nichoAutor.breadcrumb,
                name: autor.autor,
                img: autor.img400,
                title: 'Acerca de Mi',
                descripcion: autor.descripcionLarga
            }

            let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/sobre-mi_'+version+'.json';
            json.generarJsonNoticia(sobreMi, path);
        }
        res.status(200).send(resNichoAutor);
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
    actualizarCamposBDDev,
    saveAutorNicho,
    getAutorNicho
}