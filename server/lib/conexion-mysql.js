var mysql = require('mysql');

const conexion =  (data) =>{
    var connection = mysql.createPool({
      host     : data.host,
      user     : data.usuario,
      password : data.password,
      database : data.database
    });
    return connection;
}

module.exports = { conexion }