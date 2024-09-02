var mysql = require('mysql');

const conexion =  async (data) =>{
   try{
    var connection = mysql.createPool({
      host     : data.server,
      user     : data.username,
      password : data.password,
      database : data.database
    });
    return connection;
  }catch(error){
    throw error;
  }
}

module.exports = { conexion }

//GRANT SELECT, INSERT, UPDATE ON programacion.* TO 'usu_serflix'@'localhost'; permisos a la base de datos a crear.
//GRANT CREATE, ALTER ON programacion.* TO 'usu_serflix'@'localhost';
//FLUSH PRIVILEGES;
/**
 * SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;') FROM information_schema.tables WHERE table_schema = 'MyDatabaseName';
 */