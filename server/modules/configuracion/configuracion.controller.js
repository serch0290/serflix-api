'use strict';

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const fs = require('fs');
const { generatePrime } = require('crypto');

/**
 * @function generateProyecto [Función que genera las carpetas del todo el proyecto]
 * @return {[type]}                     [Retorna adeudos]
 */
const generateProyecto = (req, res) => {
	var params = null;
	try {
       
		/**Obtenemos la configuración del sitio */
		console.log(__dirname + 'configuracion.json');
		let configuracionSitio = JSON.parse(fs.readFileSync(__dirname + 'configuracion.json', 'utf8'));

		/**Generamos el archivo routing con todas las entradas que va a tener el sition web */
		generarFileRouting(configuracionSitio.entradas);

		let html = `<?php 
		$rutas = [
			'/serflix-seo/' => ['Página principal', 'sp_index.php', ''],
			'/serflix-seo/category/perros' => ['Mantenimiento', 'sp_mantenimiento.php', '/serflix-seo/category/#'],
			'/serflix-seo/privacidad' => ['Privacidad', 'sp_privacidad.php'],
		];
					?>`;

		fs.writeFileSync('index.php', html);
        res.status(200).send({msj: 'Archivo generado correctamente'});
		
	} catch (error) {
		log.fatal('Metodo: getAdeudosPorFiltro', error);
		res.status(500).send({ error: 'Ocurrió un error al generar proyecto' });
	}
}


/**
 * Función que genera el archivos con las rutas de la página 
 */
generarFileRouting = async (entradas) => {
  let html = `<?php 
                  $rutas = [`;
  for(let entrada of entradas){
	  html += `'${entrada.ruta}' => ['${entrada.descripcion}', '${entrada.nameFile}'],`;
  }
  html += `  ];
          ?>`;

  fs.writeFileSync('routing.php', html);
}

/**
 * Función que genera el menu del sitio
 */
generarHeader = async(header) =>{
  

}//Fin del metodo


module.exports = {
	generateProyecto
}