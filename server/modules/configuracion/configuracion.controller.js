'use strict';

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const fs = require('fs');
const consultas  = require('./configuracion.dao');
const nichosDao = require('./../nichos/nichos.dao');
const path = require('path');

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
const generarFileRouting = async (entradas) => {
  let html = `<?php 
                  $rutas = [`;
  for(let entrada of entradas){
	  html += `'${entrada.ruta}' => ['${entrada.descripcion}', '${entrada.nameFile}'],`;
  }
  html += `  ];
          ?>`;

  fs.writeFileSync('routing.php', html);
}


const generarCapetasProyecto = async(req, res) =>{

   try{
	const data = req.body;

	let proyecto = 'server/nichos/' + req.params.nombre;

	if (!fs.existsSync(proyecto)){
		 fs.mkdirSync(proyecto, { recursive: true });
	}

	//Generamos la carpeta de assets
	let assets = proyecto + '/assets';
	if (!fs.existsSync(assets)){
	     fs.mkdirSync(assets);
    }

	//Generamos la carpeta de assets/css
	let css = assets + '/css';
	if (!fs.existsSync(css)){
	   fs.mkdirSync(css);
    }

	//Generamos la carpeta de assets/css
	let fonts = assets + '/fonts';
	if (!fs.existsSync(fonts)){
	    fs.mkdirSync(fonts);
    }

	//Generamos la carpeta de assets/css
	let images = assets + '/images';
	if (!fs.existsSync(images)){
	     fs.mkdirSync(images);
    }

	//Generamos la carpeta de assets/css
	let js = assets + '/js';
	if (!fs.existsSync(js)){
	     fs.mkdirSync(js);
    }

	//Generamos la carpeta de assets/css
	let json = assets + '/json';
	if (!fs.existsSync(json)){
	     fs.mkdirSync(json);
    }

	//Generamos la carpeta de assets/css
	let php = assets + '/php';
	if (!fs.existsSync(php)){
	     fs.mkdirSync(php);
    }

	//Generamos la carpeta de componentes
	let componentes = proyecto + '/componentes';
	if (!fs.existsSync(componentes)){
	     fs.mkdirSync(componentes);
    }

	//Generamos la carpeta de componentes
	let pages = proyecto + '/pages';
	if (!fs.existsSync(pages)){
	     fs.mkdirSync(pages);
    }

	let response = {};
	req.body.carpetas = true;
	req.body.nicho = req.params.id;
	if(data._id){
	    response = await nichosDao.actualizarConfiguracionGeneral(req.body);	
	}else{
		response = await nichosDao.guardarConfiguracionGeneral(req.body);
	}
	
	res.status(200).send({response, msj: 'Carpeta creada correctamente'});
   }catch(error){
	log.fatal('Metodo: generarCapetasProyecto', error);
	res.status(500).send({ error: 'Ocurrió un error al generar las carpeta contenedoras del proyecto' });
   }
}

const patchGeneralSitio = async (req, res) => {
	try{
		let response = {};
	    req.body.nicho = req.params.id;
		if(data._id){
			response = await nichosDao.actualizarConfiguracionGeneral(req.body);	
		}else{
			response = await nichosDao.guardarConfiguracionGeneral(req.body);
		}

		res.status(200).send({response, msj: 'Carpeta creada correctamente'});
	}catch(error){
	  log.fatal('Metodo: patchColorSitio', error);
	  res.status(500).send({ error: 'Ocurrió un error al actualizar datos generales del proyecto' });
	}
}

const guardarFuenteNicho = async(req, res) =>{
	try{
		let data = req.body;
		data.id = req.params.id;
		let response = await nichosDao.guardarFuentes(req.body);
		res.status(200).send(response);
	}catch(error){
	  log.fatal('Metodo: guardarFuenteNicho ' + JSON.stringify(req.body), error);
	  res.status(500).send({ error: 'Ocurrió un error al agregar fuente' });
	}
}

const subirArchivosProyecto = async(req, res) =>{
	try{
		const filtro = { tipo: { $eq: 0 } };
		let files = await consultas.consultaFileRepositorio(filtro);
		let path = 'server/nichos/';
		for(let file of files){
			try{
				let origen = fs.readFileSync(path + 'respositorio/' + file.file);
				let destino = path.join(path + req.params.nombre + file.path);
				let data = await fs.writeFileSync(origen, destino);
				console.log('data_', data);
			}catch(error){
			 console.log('Error: ', error);
			}
		}
		res.status(200).send('Listo y gracias');
	}catch(error){
	  log.fatal('Metodo: subirArchivosProyecto ' + JSON.stringify(req.body), error);
	  res.status(500).send({ error: 'Ocurrió un error al subir los archivos del proyecto' });
	}
}

module.exports = {
	generateProyecto,
	generarCapetasProyecto,
	patchGeneralSitio,
	guardarFuenteNicho,
	subirArchivosProyecto
}