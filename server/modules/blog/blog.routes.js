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

module.exports = routes;

