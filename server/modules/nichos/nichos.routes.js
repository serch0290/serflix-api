const express = require('express');
const controller = require('./nichos.controller');
const routes = express.Router();

routes.get('/consulta/listado/nichos', controller.getListadoNichos);
routes.post('/guardar/nicho', controller.saveNicho);
routes.get('/consulta/nicho/:id', controller.getNicho);
routes.post('/guardar/configuracion/bd/nicho/:id', controller.saveConfigBD);
routes.post('/test/BD', controller.testBD);
routes.patch('/crear/estructura/db/:id', controller.crearEstructuraEnBD);
routes.post('/subir/actualizacion/dev', controller.actualizarCamposBDDev);
routes.post('/generar/file/conexion/local/:id', controller.generarArchivoConexionLocal);


module.exports = routes;