const express = require('express');
const controller = require('./blog.controller');

const routes = express.Router();

routes.post('/guardar/categoria/:id', controller.guardarCategoriaBlog);
routes.get('/listado/categorias/:id', controller.consultaListadoCategoria);
routes.get('/listado/noticias/:id', controller.consultaListadoNoticias);
routes.get('/consuta/datos/nicho/:id', controller.consultaNicho);
routes.post('/guardar/noticia/:id', controller.guardarNoticia);
routes.get('/consulta/noticia/:id', controller.consultaNoticiaById);
routes.post('/guardar/home', controller.saveHomeConfiguracion);
routes.get('/consulta/home/:id', controller.consultahomeConfiguracion);
routes.post('/guardar/busqueda', controller.saveBuscadorConfiguracion);
routes.patch('/publicar/noticia/nicho/:idNicho', controller.publicarDespublicarNoticia);

//categoria
routes.post('/actualizar/datos/categoria', controller.actualizarCategoria);
routes.post('/subir/modificaciones/categoria', controller.subirModificacionesCategoria);

//Subir modificaciones al ambiente de dev
routes.post('/subir/modificaciones/noticia/:id/dev', controller.subirModificacionesDEV);
routes.get('/consulta/noticias/relacionadas/:id/categoria/:idCategoria', controller.consultarNoticiasRelacionadas);

module.exports = routes;

