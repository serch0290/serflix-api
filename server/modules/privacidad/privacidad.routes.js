const express = require('express');
const controller = require('./privacidad.controller');
const routes = express.Router();

routes.post('/guardar/privacidad', controller.savePrivacidad);
routes.get('/consulta/privacidad/:id', controller.getPrivacidad);
routes.post('/subir/modificaciones/dev/:id', controller.subirModificacionesPrivacidad);

module.exports = routes;