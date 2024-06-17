const express = require('express');
const controller = require('./configuracion.controller');


const routes = express.Router();

// Ruta para obtener los adeudos por filtro y estatus
routes.get('/proyecto', controller.generateProyecto);

routes.get('/generar/carpetas', controller.generarCapetasProyecto);

module.exports = routes;

