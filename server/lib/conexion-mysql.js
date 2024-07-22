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

//GRANT SELECT, INSERT, UPDATE ON programacion.* TO 'usu_serflix'@'localhost'; permisos a la base de datos a crear.
//GRANT CREATE ON programacion.* TO 'usu_serflix'@'localhost';
//FLUSH PRIVILEGES;
/**
 * SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;') FROM information_schema.tables WHERE table_schema = 'MyDatabaseName';
 */