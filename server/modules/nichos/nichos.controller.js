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
      const response = await nichosDao.consultarNicho(req.params);
      res.status(200).send(response);
    } catch (error) {
      console.log('error: ', error);
      res.status(500).send({ error: 'Ocurrió un error al consultar el nicho' + JSON.stringify(req.params), e: error });
    }
};


module.exports = {
    getListadoNichos,
    saveNicho,
    getNicho
}

