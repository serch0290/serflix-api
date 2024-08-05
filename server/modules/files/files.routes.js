const express = require('express');
const controller = require('./files.controller');
const routes = express.Router();

routes.get('/consulta/listado/files', controller.getListadoFiles);
routes.post('/guardar/files', controller.saveFile);

module.exports = routes;