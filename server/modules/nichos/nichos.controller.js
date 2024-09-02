'use strict';
// const Sequelize = require('sequelize');
// const db = require('../../lib/db');
// const api = require('../../models/api');
const nichosDao = require('./nichos.dao');
const json = require('./../configuracion/configuracion.jsons');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const uploads = require('./../configuracion/configuracion.upload');


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
      console.log('general: ', general);
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
    const data = req.body.bd;
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

/**
 * 
 * Se crean las tablas necesarias para el nicho 
 */
const crearEstructuraEnBD = async(req, res) =>{
  let params = null;
  try{
    params = req.params;
    const conexion = require('../../lib/conexion-mysql');
    let dataConexion = await nichosDao.consultaConfigBDbyId({id: params.id});
    dataConexion.port = '3306';
    let conn = await conexion.conexion(dataConexion);
    if(conn){
       /**Creamos el json de conexion a BD */
       let path = 'server/nichos/' + req.body.nicho + '/assets/json/conexion.json';
       await json.generarJsonNoticia(dataConexion, path);
       
       /**
        * Se crea la estrctura de la tabla en BD
        */
       let bd = await nichosDao.crearEstructuraBD({conn: conn});
       console.log('bd: ', bd);
       let actualizaEstructura = await nichosDao.patchConexionBD2({_id:params.id, estructura: {estructura: true, ambiente: {local: true}}});  
        
       res.status(200).send(actualizaEstructura);
    }else{
      res.status(500).send({ error: 'No se pudo realizar la conexión a la base de datos'});
    }
  }catch(error){
    log.fatal('Metodo: crearEstructuraEnBD ' + JSON.stringify(req.body), error);
    res.status(500).send({ error: 'Ocurrió un error al crear la estructura en BD', e: error });
  }
}

const generarArchivoConexionLocal = async(req, res)=>{
  let params = null;

  try{
    params = req.params;
    let dataConexion = await nichosDao.consultaConfigBDbyId({id: params.id});

    console.log('dataconexion: ', dataConexion);

     /**Creamos el json de conexion a BD */
     let path = 'server/nichos/' + req.body.nicho + '/assets/json/conexion.json';
     await json.generarJsonNoticia(dataConexion, path);

     let actualizaEstructura = await nichosDao.patchConexionBD2({_id:params.id, estructura: {ambiente: {local: true, dev: false, prod: false}}});  
     res.status(200).send(actualizaEstructura);
  }catch(error){
    log.fatal('Metodo: generarArchivoConexionLocal ' + JSON.stringify(req.body), error);
    res.status(500).send({ error: 'Ocurrió un error al crear la estructura en BD', e: error });
  }
}

/**
 * Se sube datos al ambiente de DEV y se actualiza en bd
 */
const actualizarCamposBDDev = async(req, res)=>{
  try{
    const commands = req.body.commands;
		for(let comand of commands){
			await uploads.subirCarpetasPruebas(comand);
		}

		const campo = req.body.campo;
		let bd = await nichosDao.patchConfigBD(campo);
		res.status(200).send({bd, msj: 'Se subieron los archivos correctamente al ambiente de pruebas'});						

  }catch(error){
    log.fatal('Metodo: actualizarCamposBD ' + JSON.stringify(req.body), error);
    res.status(500).send({ error: 'Ocurrió un error al actualizar datos del bd', e: error });
  }
}

module.exports = {
    getListadoNichos,
    saveNicho,
    getNicho,
    saveConfigBD,
    testBD,
    crearEstructuraEnBD,
    actualizarCamposBDDev,
    generarArchivoConexionLocal
}

