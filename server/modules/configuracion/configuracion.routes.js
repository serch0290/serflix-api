const express = require('express');
const controller = require('./configuracion.controller');


const routes = express.Router();

// Ruta para obtener los adeudos por filtro y estatus
routes.get('/proyecto', controller.generateProyecto);

routes.post('/generar/carpetas/:nombre/:id', controller.generarCapetasProyecto);
routes.post('/actualizar/general/:id', controller.patchGeneralSitio);
routes.post('/actualizar/fuente/:id', controller.guardarFuenteNicho);
routes.get('/subir/files/:id/:nombre', controller.subirArchivosProyecto);

module.exports = routes;

