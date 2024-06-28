'use strict';

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const consultas  = require('./blog.dao');
const nichosDao = require('./../nichos/nichos.dao');


const guardarCategoriaBlog = async(req, res) =>{
    try{
     let data = req.body;
     data.nicho = req.params.id;
     let categoria = await consultas.guardarCategoriaBlog(data);
     res.status(200).send(categoria);
    }catch(error){
       log.fatal('Metodo: guardarCategoriaBlog ' + JSON.stringify(req.body) + req.params.id, error);
       res.status(500).send({ error: 'Ocurrió un error al guardar la categoria.' });
    }
 }

 const consultaListadoCategoria = async(req, res) =>{
    
    try{
        let categorias = await consultas.consultaListadoCategorias(req.params);
        res.status(200).send(categorias);
    }catch(error){
       log.fatal('Metodo: consultaListadoCategoria ' + JSON.stringify(req.body) + req.params.id, error);
       res.status(500).send({ error: 'Ocurrió un error al consultar el listado de categorias' });
    }
 }

 const consultaListadoNoticias = async(req, res) =>{
    
    try{
        let noticias = await consultas.consultaListadoNoticias(req.params);
        res.status(200).send(noticias);
    }catch(error){
       log.fatal('Metodo: consultaListadoCategoria ' + JSON.stringify(req.params) + req.params.id, error);
       res.status(500).send({ error: 'Ocurrió un error al consultar el listado de noticias' });
    }
 }

 const consultaNicho = async(req, res)=>{
   try{
      let categoria = await consultas.consultaCategoriaById({id: req.params.id});
      let nicho = await nichosDao.consultarNicho({id: categoria.nicho});
      res.status(200).send({nicho, categoria});
   }catch(error){
      log.fatal('Metodo: consultaNicho ' + JSON.stringify(req.params) + req.params.id, error);
      res.status(500).send({ error: 'Ocurrió un error al consultar los datos del nicho' });
   }
 }

 module.exports = {
    guardarCategoriaBlog,
    consultaListadoCategoria,
    consultaListadoNoticias,
    consultaNicho
 }