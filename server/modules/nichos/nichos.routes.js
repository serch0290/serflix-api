const express = require('express');
const controller = require('./nichos.controller');
const routes = express.Router();

routes.get('/consulta/listado/nichos', controller.getListadoNichos);
routes.post('/guardar/nicho', controller.saveNicho);
routes.get('/consulta/nicho/:id', controller.getNicho);
routes.post('/guardar/configuracion/bd/nicho/:id', controller.saveConfigBD);
routes.post('/test/BD', controller.testBD)

module.exports = routes;