const express = require('express');
const controller = require('./nichos.controller');
const routes = express.Router();

routes.get('/consulta/listado/nichos', controller.getListadoNichos);
routes.post('/guardar/nicho', controller.saveNicho);
routes.get('/consulta/nicho/:id', controller.getNicho);

module.exports = routes;