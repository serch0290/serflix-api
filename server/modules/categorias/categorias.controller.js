const consultas = require('./categorias.dao');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const getCategoriaDetalle = async(req, res) =>{
    
    try{
        let categoria = await consultas.consultaCategoriaById(req.params);
        res.status(200).send(categoria);
    }catch(error){
       log.fatal('Metodo: getCategoriaDetalle ' + JSON.stringify(req.params), error);
       res.status(500).send({ error: 'Ocurrió un error al consultar categoria detalle' });
    }
 }

module.exports = {
    getCategoriaDetalle
}