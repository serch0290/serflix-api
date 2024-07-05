'use strict';

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const consultas  = require('./blog.dao');
const nichosDao = require('./../nichos/nichos.dao');
const json = require('./../configuracion/configuracion.jsons');


const guardarCategoriaBlog = async(req, res) =>{
    try{
     let data = req.body.categoria;
     data.nicho = req.params.id;
     let categoria = await consultas.guardarCategoriaBlog(data);

     let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/' + categoria.url + '.json';
     json.generarJsonNoticia(noticia, path);

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
      let general = await nichosDao.consultaConfiguracionGeneral({id: categoria.nicho});
      res.status(200).send({nicho, categoria, general});
   }catch(error){
      log.fatal('Metodo: consultaNicho ' + JSON.stringify(req.params) + req.params.id, error);
      res.status(500).send({ error: 'Ocurrió un error al consultar los datos del nicho' });
   }
 }

 const guardarNoticia = async(req, res) =>{
   try{
      let data = req.body.noticia;
      data.categoria = req.params.id;
      let noticia = null;
      if(data._id){
         noticia = await consultas.actualizarNoticia(data);
      }else{
         noticia = await consultas.guardarNoticia(data);
      }

      let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/' + noticia.url + '.json';
      json.generarJsonNoticia(noticia, path);
      res.status(200).send(noticia);
   }catch(error){
      log.fatal('Metodo: guardarNoticia ' + JSON.stringify(req.body) + req.params.id, error);
      res.status(500).send({ error: 'Ocurrió un error al guardar noticia' });
   }
 }

 const consultaNoticiaById = async(req, res)=>{
   try{
      let noticia = await consultas.consultaNoticiaById({id: req.params.id});
      res.status(200).send(noticia);
   }catch(error){
      log.fatal('Metodo: consultaNoticiaById ' + JSON.stringify(req.params) + req.params.id, error);
      res.status(500).send({ error: 'Ocurrió un error al consultar noticia' });
   }
 }

 module.exports = {
    guardarCategoriaBlog,
    consultaListadoCategoria,
    consultaListadoNoticias,
    consultaNicho,
    guardarNoticia,
    consultaNoticiaById
 }