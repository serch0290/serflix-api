const express = require('express');
const controller = require('./menus.controller');
const routes = express.Router();

routes.post('/guardar/menu', controller.saveMenu);
routes.get('/consulta/menu/:id', controller.getMenu);
routes.post('/subir/modificaciones/dev/:id', controller.subirModificacionesMenu);

module.exports = routes;