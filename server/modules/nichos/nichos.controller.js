'use strict';
// const Sequelize = require('sequelize');
// const db = require('../../lib/db');
// const api = require('../../models/api');
const nichosDao = require('./nichos.dao');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');


/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const getListadoNichos = async (req, res) => {
  try {
    const response = await nichosDao.getListadoNichos();
    res.status(200).send(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send({ error: 'Ocurrió un error al consultar el listado de nichos', e: error });
  }
};

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const saveNicho = async (req, res) => {
    try {
      const nicho = { nombre: req.body.nombre, descripcion: req.body.descripcion};
      const response = await nichosDao.guardarNicho(nicho);
      res.status(200).send(response);
    } catch (error) {
      console.log('error: ', error);
      res.status(500).send({ error: 'Ocurrió un error al guardar el nicho' + JSON.stringify(req.body), e: error });
    }
};


/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const getNicho = async (req, res) => {
    try {
      let nicho = await nichosDao.consultarNicho(req.params);
      let database = await nichosDao.consultaConfigBD(req.params);
      let general = await nichosDao.consultaConfiguracionGeneral(req.params);
      res.status(200).send({nicho, database, general});
    } catch (error) {
      console.log('error: ', error);
      res.status(500).send({ error: 'Ocurrió un error al consultar el nicho' + JSON.stringify(req.params), e: error });
    }
};

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const saveConfigBD = async (req, res) => {
  try {
    const data = req.body;
    data.nicho = req.params.id;
    let response = {};

    if(data._id){
       response = await nichosDao.patchConfigBD(data);
    }else{
       response = await nichosDao.guardarBD(data);
    }
    
    res.status(200).send(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send({ error: 'Ocurrió un error al guardar la configuracion de la BD' + JSON.stringify(req.body), e: error });
  }
};

/**
 *
 * @author Sergio Cruz Flores
 * @returns {object} objeto con los datos del menu
 */
const testBD = async (req, res) => {
  try {
    const conexion = require('../../lib/conexion-mysql');
    let conn = await conexion.conexion(req.body);
    req.body.conn = !(conn == undefined);
    let response = {};
    let patch = await nichosDao.patchConexionBD(req.body).then(res=>{});
    if(conn){
       response = {conn: true, msj: 'Conexión exitosa'};
       conn.end();
    }else{
       response = {conn: false, msj: 'Conexión NO exitosa'};
    }
    res.status(200).send(response);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send({ error: 'Se valida si se puede realizar la conexión a la BD en mysql' + JSON.stringify(req.body), e: error });
  }
};

module.exports = {
    getListadoNichos,
    saveNicho,
    getNicho,
    saveConfigBD,
    testBD
}

