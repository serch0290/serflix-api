const express = require('express');
const controller = require('./version.controller');
const routes = express.Router();

routes.get('/consulta/version/:id', controller.getVersionesNicho);

module.exports = routes;