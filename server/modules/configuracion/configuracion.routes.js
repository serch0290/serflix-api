const express = require('express');
const controller = require('./configuracion.controller');


const routes = express.Router();

// Ruta para obtener los adeudos por filtro y estatus
routes.get('/proyecto', controller.generateProyecto);

routes.post('/generar/carpetas/:nombre/:id', controller.generarCapetasProyecto);
routes.post('/actualizar/general/:id', controller.patchGeneralSitio);

module.exports = routes;

