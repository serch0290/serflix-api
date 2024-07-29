const express = require('express');
const controller = require('./upload.controller');
const routes = express.Router();

routes.post('/file', controller.upload);
routes.post('/resize/image', controller.transformarImagenesResoluciones);

module.exports = routes;