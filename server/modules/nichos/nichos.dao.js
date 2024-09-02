const conexion = require('../../lib/conexion-mongo');
const mongoose = conexion.init();
const models = require('../../models/nicho');


const getListadoNichos = params => {
   return models.nicho.find();
}

const guardarNicho = params => {
    return models.nicho.create(params);
}

const consultarNicho = params =>{
    return models.nicho.findOne({_id: params.id}).lean();
}

const consultaConfigBD = async params =>{
    return await models.bd.findOne({nicho: params.id});
}

const consultaConfigBDbyId = async params =>{
    return await models.bd.findOne({_id: params.id}, {server: 1, username: 1, password: 1, database: 1, _id: 0});
}

const patchConfigBD = async params =>{
    return await models.bd.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const patchConexionBD = async params =>{
    return await models.bd.findByIdAndUpdate(
        params._id,
        { $set: { conexion: params.conn } },
        { new: true, runValidators: true }
    );
}

const guardarBD = async params =>{
    return models.bd.create(params);
}

const guardarConfiguracionGeneral = params=> {
   return models.general.create(params);
}

const actualizarConfiguracionGeneral = params =>{
    return models.general.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

const actualizarConfiguracionCampoGeneral = async params =>{
    return await models.general.updateOne({_id:  mongoose.Types.ObjectId(params._id)},  
                                          { $set:  params.campo  });
}

const consultaConfiguracionGeneral = async params => {
    return await models.general.findOne({nicho: params.id});
}

const guardarFuentes = async params =>{
    
    return await models.general.findOneAndUpdate(
        params.id,
        { $push: { fuentes: params.fuente } },
        { new: true, runValidators: true }
    );
}

const crearEstructuraBD = async params =>{
    const fs = require('fs');
    const sqlScript = fs.readFileSync('./server/nichos/repositorio/assets/php/lib/estructura-bd.sql', 'utf8');
    const sqlStatements = sqlScript.split(';');

    return await new Promise( async (resolve, reject) => {
        let result, i = 0;
        for(let statement of sqlStatements){
            if (statement.trim() !== '') {
                console.log('AHaz el putro query');
                await params.conn.query(statement, {}, (error, result) => {
                    console.log('error: ', error, result);
                    if (error) reject(error);
                    result = result;
                });
            }  
        }
        resolve(result);
    });
}

const patchConexionBD2 = async params =>{
    return await models.bd.findByIdAndUpdate(
        params._id,
        { $set:  params.estructura },
        { new: true, runValidators: true }
    );
}
 
module.exports = {
    getListadoNichos,
    guardarNicho,
    consultarNicho,
    guardarBD,
    consultaConfigBD,
    patchConfigBD,
    patchConexionBD,
    guardarConfiguracionGeneral,
    consultaConfiguracionGeneral,
    actualizarConfiguracionGeneral,
    guardarFuentes,
    consultaConfigBDbyId,
    crearEstructuraBD,
    patchConexionBD2,
    actualizarConfiguracionCampoGeneral
}
