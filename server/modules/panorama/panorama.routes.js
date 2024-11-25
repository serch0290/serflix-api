const express = require('express');
const controller = require('./panorama.controller');
const routes = express.Router();

routes.get('/consulta/panorama/:id', controller.getListadoPanoramaConfiguracion);

module.exports = routes;