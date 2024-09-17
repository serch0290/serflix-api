const express = require('express');
const controller = require('./categorias.controller');

const routes = express.Router();

routes.get('/consulta/categoria/:id', controller.getCategoriaDetalle);

module.exports = routes;