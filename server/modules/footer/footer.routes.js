const express = require('express');
const controller = require('./footer.controller');
const routes = express.Router();

routes.post('/guardar/footer', controller.saveFooter);
routes.get('/consulta/footer/:id', controller.getFooter);
routes.post('/subir/modificaciones/dev/:id', controller.subirModificacionesMenu);

module.exports = routes;