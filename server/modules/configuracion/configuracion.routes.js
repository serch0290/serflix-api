const express = require('express');
const controller = require('./configuracion.controller');


const routes = express.Router();

// Ruta para obtener los adeudos por filtro y estatus
routes.get('/proyecto', controller.generateProyecto);

routes.post('/generar/carpetas/:nombre/:id', controller.generarCapetasProyecto);
routes.post('/actualizar/general/:id', controller.patchGeneralSitio);
routes.post('/actualizar/fuente/:id', controller.guardarFuenteNicho);
routes.get('/subir/files/:id/:nombre', controller.subirArchivosProyecto);
routes.post('/guardar/logo/:id', controller.guardarLogoNicho);
routes.post('/guardar/icon/:id', controller.guardarIconNicho);
routes.post('/generar/routing/:id', controller.generarRouting);
routes.post('/subir/modificacion', controller.subirModificaciones);

routes.post('/subir/colores/fuente/:id', controller.actualizarColorFuentes);
routes.post('/subir/modificaciones/dev/:id', controller.subirModificacionesDEV);

routes.post('/generar/json/logo/icon/:id', controller.generarJSONIconImagen);

routes.post('/eliminar/configuracion/genera', controller.eliminarConfiguracionGeneralNicho);

module.exports = routes;

