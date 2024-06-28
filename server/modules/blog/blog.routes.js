const express = require('express');
const controller = require('./blog.controller');

const routes = express.Router();

routes.post('/guardar/categoria/:id', controller.guardarCategoriaBlog);
routes.get('/listado/categorias/:id', controller.consultaListadoCategoria);
routes.get('/listado/noticias/:id', controller.consultaListadoNoticias);
routes.get('/consuta/datos/nicho/:id', controller.consultaNicho);

module.exports = routes;

