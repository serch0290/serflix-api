/**
 * Realiza la conexion a mysql
 */
const conexion = async (dataConexion)=>{
    const conexion = require('./conexion-mysql');
    let conn = await conexion.conexion(dataConexion);
    return conn;
}

module.exports = {conexion}
