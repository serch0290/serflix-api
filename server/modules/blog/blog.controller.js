'use strict';

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const consultas  = require('./blog.dao');
const nichosDao = require('./../nichos/nichos.dao');
const json = require('./../configuracion/configuracion.jsons');
const daoMysql = require('../nichos/nichos-mysql.dao');
const uploads = require('./../configuracion/configuracion.upload');
const helpers = require('../../lib/helpers');
const fs = require('fs');

const guardarCategoriaBlog = async(req, res) =>{
    try{
     let data = req.body.categoria, categoriaMysql = null;
     data.nicho = req.params.id;

     /**
      * guardar Categoria en mysql excepto cuando sea de home, esa no necesita
      */
     if(!data.home){
        let dataConexion = await nichosDao.consultaConfigBD({id: data.nicho});
        const conexion = require('../../lib/conexion-mysql');
        let conn = await conexion.conexion(dataConexion);
        if(conn){
           categoriaMysql = await daoMysql.guardarCategoriaNicho(conn, {nombre: data.title});
           data.idSQL = categoriaMysql.insertId;
        }
      }
   
      let categoria = await consultas.guardarCategoriaBlog(data);
      
      if(!data.home){
         let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/' + categoria.url + '.json';
         json.generarJsonNoticia(categoria, path);
      }
      
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
      let data = req.body.noticia, noticiaMysql;
      data.categoria = req.params.id;
      let noticia = null, noticiaSQL = null;

      let dataConexion = await nichosDao.consultaConfigBD({id: req.body.nicho.id});
      const conexion = require('../../lib/conexion-mysql');
      let conn = await conexion.conexion(dataConexion);

      if(data._id){
         noticia = await consultas.actualizarNoticia(data);
         noticiaSQL = await daoMysql.actualizarNoticia(conn, data);
      }else{
         if(conn){
            noticiaMysql = await daoMysql.guardarNoticia(conn, data);
            data.idNoticia = noticiaMysql.insertId;
            await daoMysql.guardarCategoria(conn, {idNoticia: noticiaMysql.insertId, idCategoria: req.body.nicho.idCategoria});

            let imagen = data.detalle.find(item=> item.type.includes('img'));
            //Se guarda imagen original
            await daoMysql.guardarImagenes(conn, {idNoticia: noticiaMysql.insertId, idResolucion: 1, url: imagen.img, resolucion: '2000x1000'});
            //resolucion de 1024
            await daoMysql.guardarImagenes(conn, {idNoticia: noticiaMysql.insertId, idResolucion: 2, url: imagen.img1024, resolucion: '1014x225'});
            //resolucion de 800
            await daoMysql.guardarImagenes(conn, {idNoticia: noticiaMysql.insertId, idResolucion: 3, url: imagen.img800, resolucion: '800x225'});
            //resolucion de 400
            await daoMysql.guardarImagenes(conn, {idNoticia: noticiaMysql.insertId, idResolucion: 4, url: imagen.img400, resolucion: '400x225'});
         }
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

 const saveHomeConfiguracion = async(req, res)=>{
   try{
      let home = req.body.home;
      let noticia = null;
      
      let menu = [];
      let pathMenu = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/menu.json';
      json.generarJsonNoticia(menu, pathMenu);

      let footer = [];
      let pathFooter = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/footer.json';
      json.generarJsonNoticia(footer, pathFooter);

      if(!home._id){
         noticia = await consultas.guardarHome(home);
      }else{
         noticia = await consultas.actualizarHome(home);
      }
      
      let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/home.json';
      json.generarJsonNoticia(noticia, path);
      res.status(200).send(noticia);
   }catch(error){
      log.fatal('Metodo: saveHomeConfiguracion ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al guardar la home' });
   }
 }

 const consultahomeConfiguracion = async(req, res)=>{
   try{
      let categoria = await consultas.consultaCategoriaById(req.params);
      let nicho = await nichosDao.consultarNicho({id: categoria.nicho});
      let home = await consultas.getHome(req.params);
      let busqueda = await consultas.getBuscador(req.params);
      nicho.home = home;
      nicho.categoria = categoria;
      nicho.busqueda = busqueda;
      res.status(200).send(nicho);
   }catch(error){
      log.fatal('Metodo: consultahomeConfiguracion ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al consultar la configuracion del home' });
   }
 }

 const saveBuscadorConfiguracion = async(req, res)=>{
   try{
      let buscador = req.body.busqueda;
      let busca = null;
      if(!buscador._id){
         busca = await consultas.guardarBuscador(buscador);
      }else{
         busca = await consultas.actualizarBuscador(buscador);
      }
      let path = 'server/nichos/' + req.body.nicho.nombre + '/assets/json/busqueda.json';
      json.generarJsonNoticia(busca, path);
      res.status(200).send(busca);
   }catch(error){
      log.fatal('Metodo: saveHomeConfiguracion ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al guardar la busqueda' });
   }
 }

 const actualizarCategoria = async(req, res) =>{
   try{
      let categoria = await consultas.actualizarCategoria(req.body.campos);
      res.status(200).send(categoria);
   }catch(error){
      log.fatal('Metodo: actualizarCategoria ' + JSON.stringify(req.body), error);
      res.status(500).send({ error: 'Ocurrió un error al actualizar datos de la categoria' });
   }
 }

 const subirModificacionesCategoria = async(req, res) =>{
	try{
		for(let command of req.body.commands){
         await uploads.subirCarpetasPruebas(command);
      }
		
		let categoria = await consultas.actualizarCategoria(req.body.campos);
	    res.status(200).send({categoria, msj: 'Se subieron carpetas a pruebas correctamente'});
	}catch(error){
	  log.fatal('Metodo: subirModificaciones', error);
	  res.status(500).send({ error: 'Ocurrió un error al subir modificaciones a dev o prod' });
	}
}

/**
 * Se sube la noticia al ambinete de pruyebas y se notifica
 */
const subirModificacionesDEV = async(req, res) =>{
	try{
		const commands = req.body.commands;
      let rutaNoticia = commands[1].split(' ');

      /**
       * Si no existe la carpeta de las noticias se crea
       */
      if(!fs.existsSync(rutaNoticia[rutaNoticia.length - 1])){
          await uploads.subirCarpetasPruebas('mkdir ' + rutaNoticia[rutaNoticia.length - 1]);
      }

		for(let comand of commands){
			await uploads.subirCarpetasPruebas(comand);
		}

      /**Actualizamos los campos en bd */
		let campo = req.body.campo;
      campo._id = req.params.id;
		let noticia = await consultas.actualizarNoticia(campo);
		res.status(200).send({noticia, msj: 'Se subio correctamente al ambiente de pruebas la noticia'});							
	}catch(error){
	  log.fatal('Metodo: subirModificacionesDEV', error);
	  res.status(500).send({ error: 'Ocurrió un error al subir modificaciones dev' });
	}
}

/**
 * Función para publicar o despublicar una noticia
 */
const publicarDespublicarNoticia = async(req, res) =>{
   try{
      let params = req.params;
      let dataConexion = await nichosDao.consultaConfigBD({id: params.idNicho});
      let conn = await helpers.conexion(dataConexion);
      if(conn){
         let data = req.body;
         let campo = data.campo;
         let noticia = await consultas.actualizarNoticia(campo);
         let noticiaSQL = await daoMysql.publicarNoticia(conn, {estatus: data.estatus, idSQL: campo.idSQL});
         res.status(200).send({noticia, msj: 'Se publico correctamente la noticia'});							
      }else{
         res.status(500).send({ error: 'No se pudo realizar conexión a BD de mysql' });
      }
   }catch(error){
      log.fatal('Metodo: publicarDespublicarNoticia', error);
	   res.status(500).send({ error: 'Ocurrió un error al publicar o despublicar una noticia' });
   }
}

const consultarNoticiasRelacionadas = async(req, res) =>{

   try{
      let params = req.params;
      let noticias = await consultas.getListadoNoticiasRelacionadas(params);
      res.status(200).send(noticias);						
   }catch(error){
      log.fatal('Metodo: consultarNoticiasRelacionadas: ' + JSON.stringify(req.params), error);
	   res.status(500).send({ error: 'Ocurrió un error al consultar las noticias relacionadas' });
   }
}

 module.exports = {
    guardarCategoriaBlog,
    consultaListadoCategoria,
    consultaListadoNoticias,
    consultaNicho,
    guardarNoticia,
    consultaNoticiaById,
    saveHomeConfiguracion,
    consultahomeConfiguracion,
    saveBuscadorConfiguracion,
    actualizarCategoria,
    subirModificacionesCategoria,
    subirModificacionesDEV,
    publicarDespublicarNoticia,
    consultarNoticiasRelacionadas
 }