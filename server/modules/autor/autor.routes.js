const express = require('express');
const controller = require('./autor.controller');

const routes = express.Router();

routes.get('/listado/autores', controller.getListadoAutores);
routes.post('/guardar/autor', controller.saveAutores);
routes.post('/subir/autor/dev', controller.actualizarCamposBDDev);

module.exports = routes;