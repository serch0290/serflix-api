const consultas = require('./autor.dao');

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
        let data = req.body;
        let autor = await consultas.guardarAutores(data);
        res.status(200).send(autor);
    }catch(error){
       log.fatal('Metodo: saveAutores ' + JSON.stringify(req.body), error);
       res.status(500).send({ error: 'Ocurrió un error al guardar autores' });
    }
 }

module.exports = {
    getListadoAutores,
    saveAutores
}