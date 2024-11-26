const express = require('express');
const controller = require('./panorama.controller');
const routes = express.Router();

routes.get('/consulta/panorama/:id', controller.getListadoPanoramaConfiguracion);
routes.post('/guardar/panorama', controller.savePanorama);

module.exports = routes;