const express = require('express');
const controller = require('./autor.controller');

const routes = express.Router();

routes.get('/listado/autores', controller.getListadoAutores);
routes.post('/guardar/autor', controller.saveAutores);

module.exports = routes;