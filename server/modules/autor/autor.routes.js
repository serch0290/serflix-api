const express = require('express');
const controller = require('./autor.controller');

const routes = express.Router();

routes.get('/listado/autores', controller.getListadoAutores);
routes.post('/guardar/autor', controller.saveAutores);
routes.post('/subir/autor/dev', controller.actualizarCamposBDDev);
routes.post('/guardar/nicho/autor', controller.saveAutorNicho);
routes.get('/consulta/autor/nicho/:id', controller.getAutorNicho);

module.exports = routes;