'use strict';

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');

const fs = require('fs');
const consultas  = require('./configuracion.dao');
const nichosDao = require('./../nichos/nichos.dao');
const noticiasDao = require('./../blog/blog.dao');
const path = require('path');
const handlebars = require('handlebars');
const uploads = require('./configuracion.upload');
const json = require('./../configuracion/configuracion.jsons');


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

	//Generamos la carpeta de assets/css/components
	let cssComponents = assets + '/css/components';
	if (!fs.existsSync(cssComponents)){
	   fs.mkdirSync(cssComponents);
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
	let noticias = assets + '/images/noticias';
	if (!fs.existsSync(noticias)){
	     fs.mkdirSync(noticias);
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

	//Generamos la carpeta de assets/css
	let phpLib = assets + '/php/lib';
	if (!fs.existsSync(phpLib)){
	     fs.mkdirSync(phpLib);
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
	req.body.carpetas.local = true;
	req.body.nicho = req.params.id;
	if(data._id){
	    response = await nichosDao.actualizarConfiguracionGeneral(req.body);	
	}else{
		response = await nichosDao.guardarConfiguracionGeneral(req.body);
	}
	
	res.status(200).send(response);
   }catch(error){
	log.fatal('Metodo: generarCapetasProyecto', error);
	res.status(500).send({ error: 'Ocurrió un error al generar las carpeta contenedoras del proyecto' });
   }
}

const subirModificaciones = async(req, res) =>{
	try{
		const command = `cp -r server/nichos/${req.body.nombre} /Applications/XAMPP/htdocs`;
		await uploads.subirCarpetasPruebas(command);

		req.body.general.carpetas.dev = true;
		let general = nichosDao.actualizarConfiguracionCampoGeneral({_id: req.body.general._id, campo: {'carpetas.dev': true }});
	    res.status(200).send({general, msj: 'Se subieron carpetas a pruebas correctamente'});
	}catch(error){
	  log.fatal('Metodo: subirModificaciones', error);
	  res.status(500).send({ error: 'Ocurrió un error al subir modificaciones a dev o prod' });
	}
}

/**
 * Se suben los colores y la fuente a local, solo a local
 * @param {*} res 
 */
const actualizarColorFuentes = async(req, res) =>{
	let data = null;
	try{
	  data = req.body;
	  
	  /**
	   * Generamos los css con los colores del sitio y la fiente tambien
	   */
	  let fuente = data.fuentes.find(item=> !item.negrita);
	  let negrita = data.fuentes.find(item=> item.negrita);

	  if(data.fuentes.length > 0){ //Este proceso solo se hace una vez, o solo se se cambia de fuente se vuelve e hacer este proceso
		 let path_nichos = 'server/nichos/' + req.body.nicho;
		 let dynamicCss = fs.readFileSync('server/templates/dynamic.hbs', 'utf8');
		 let template = handlebars.compile(dynamicCss);
		 let content = null;
		 content = template({background: data.background, fuente: fuente.file, negrita: negrita.file});
	     fs.writeFileSync(path_nichos + '/assets/css/dynamic.css', content);
	  }
		 
	  /**Actualizamos los campos en bd */
	  let campos = {
		$set: {
			'background.value': data.background,
			'background.local': true,
			'background.dev': false,
			'background.prod': false
		},
		$push: {
			fuentes: data.fuentes
		},
		dominio: data.dominio
	  }

	  let general = await consultas.actualizacionCamposGeneral({_id: req.params.id, campo: campos});
	  res.status(200).send({general, msj: 'Se creo el archivo dynamic correctamente'});										
	}catch(error){
	  log.fatal('Metodo: pathColorSitio', error);
	  res.status(500).send({ error: 'Ocurrió un error al guardar el color del sitio' });
	}
}

const subirModificacionesDEV = async(req, res) =>{
	try{
		const commands = req.body.commands;
		for(let comand of commands){
			await uploads.subirCarpetasPruebas(comand);
		}

		const campo = req.body.campo;
		let general = await consultas.actualizacionCamposGeneral({_id: req.params.id, campo: campo});
		res.status(200).send({general, msj: 'Se subieron los archivos correctamente al ambiente de pruebas'});							

	}catch(error){
	  log.fatal('Metodo: subirModificacionesDEV', error);
	  res.status(500).send({ error: 'Ocurrió un error al subir modificaciones dev' });
	}
}

const patchGeneralSitio = async (req, res) => {
	try{
		let response = {};
		let data = req.body.general;
	    data.nicho = req.params.id;
		if(data._id){
			response = await nichosDao.actualizarConfiguracionGeneral(data);	
		}else{
			response = await nichosDao.guardarConfiguracionGeneral(data);
		}

		/**
		 * Generamos el archivo css con los colores del sitio y tambien ponemos la fuente
		 */
		let fuente = data.fuentes.find(item=> !item.negrita);
		let negrita = data.fuentes.find(item=> item.negrita);
		let path_nichos = 'server/nichos/' + req.body.nicho.name;
		let dynamicCss = fs.readFileSync('server/templates/dynamic.hbs', 'utf8');
		let template = handlebars.compile(dynamicCss);
		let content = template({background: data.background, fuente: fuente.file, negrita: negrita.file});
		fs.writeFileSync(path_nichos + '/assets/css/dynamic.css', content);

		/**
		 * Generamos el json de configuracion general
		 */
		let configuracionGeneral = {
			logo: 'assets/' + data.logo.file,
			icon: 'assets/' + data.icon.file
		}

		fs.writeFileSync(path_nichos + '/assets/json/configuracionGeneral.json', JSON.stringify(configuracionGeneral));
		res.status(200).send({response, msj: 'Carpeta creada correctamente'});
	}catch(error){
	  log.fatal('Metodo: patchGeneralSitio', error);
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
		const filtro = { tipo: { $eq: 0 }, dynamic: { $eq: false }};
		let files = await consultas.consultaFileRepositorio(filtro);
		let path_nichos = 'server/nichos/';
		for(let file of files){
			try{
				let pathFile = file.path + file.file;
				let origen = path.join(path_nichos + 'repositorio' + pathFile);
				let destino = path.join(path_nichos + req.params.nombre + pathFile);
				await fs.copyFileSync(origen, destino);
			}catch(error){
			 throw error;
			}
		}

		const filtroDynamic = { tipo: { $eq: 0 }, dynamic: { $eq: true }};
		let filesDynamic = await consultas.consultaFileRepositorio(filtroDynamic);

		for(let file of filesDynamic){
			let name = file.file.split('.')[0];
			let dynamic = fs.readFileSync(`server/templates/${name}.hbs`, 'utf8');
			let template = handlebars.compile(dynamic);
			let content = template({nombre: req.body.dominio});
			fs.writeFileSync(`${path_nichos}${req.params.nombre}${file.path}${file.file}`, content);
		}

		let campo = {
			$set: {
				'filesProyecto.local': true,
				'filesProyecto.dev': false,
				'filesProyecto.prod': false
			}
		}

		generaHtaccess(`${path_nichos}${req.params.nombre}`);

		let general = await consultas.actualizacionCamposGeneral({_id: req.params.id, campo: campo});
		res.status(200).send({general, status: true});
	}catch(error){
	  log.fatal('Metodo: subirArchivosProyecto ' + JSON.stringify(req.body), error);
	  res.status(500).send({ error: 'Ocurrió un error al subir los archivos del proyecto' });
	}
}

const guardarLogoNicho = async(req, res) =>{
   try{
	let data = req.body;
	data.id = req.params.id;
	let logo = await consultas.guardarLogoNicho(data);
	res.status(200).send(logo);
   }catch(error){
	  log.fatal('Metodo: guardarLogoNicho ' + JSON.stringify(req.body), error);
	  res.status(500).send({ error: 'Ocurrió un error al guardar el logo del nicho' });
   }
}

const guardarIconNicho = async(req, res) =>{
	try{
	 let data = req.body;
	 data.id = req.params.id;
	 let logo = await consultas.guardarIconNicho(data);
	 res.status(200).send(logo);
	}catch(error){
	   log.fatal('Metodo: guardarIconNicho ' + JSON.stringify(req.body), error);
	   res.status(500).send({ error: 'Ocurrió un error el icon del nicho' });
	}
 }

 const generarRouting = async(req, res) =>{
	let data = null;
	try{
		data = req.params;
		let categorias = await noticiasDao.consultaListadoCategorias(data);

		let routing = [];
		routing.push({url: '/', descripcion: '-', file: 'sp_index.php'});
		//routing.push({url: '/' + req.body.dominio + '/', descripcion: '-', file: 'sp_index.php'});
		for(let categoria of categorias){
			if(!categoria.home){
				//routing.push({url: '/' + req.body.dominio + categoria.url, descripcion: '-', file: 'sp_category.php'});
				routing.push({url: categoria.url, descripcion: '-', file: 'sp_category.php'});
				categoria.noticias = await noticiasDao.consultaListadoNoticias({id: categoria._id});
				for(let noticia of categoria.noticias){
					//routing.push({url: '/' + req.body.dominio + categoria.url + '/' + noticia.url, descripcion: '-', file: 'sp_noticia.php'});
					routing.push({url: noticia.url, descripcion: '-', file: 'sp_noticia.php'});
				}
			}
		}

		let path = 'server/nichos/' + req.body.proyecto;
		await generarFileRoutingReal(routing, path);

		/**Actualizamos los campos en bd */
		let campo = {
			$set: {
				'routing.local': true,
				'routing.dev': false,
				'routing.prod': false
			}
		}

		let general = await consultas.actualizacionCamposGeneral({_id: req.body.id, campo: campo});
		res.status(200).send({general, msj: 'Archivo routing generado correctamente'});
	}catch(error){
		log.fatal('Metodo: generarRouring ' + JSON.stringify(req.body), error);
	   res.status(500).send({ error: 'Ocurrió un error al generar las rutas del proyecto' });
	}
 }

 /**
  * 
  * Se genera el htaccess para local
  */
 const generaHtaccess = async (path) =>{
	let data = `
	      # Permite reescribir las peticiones de URL
          RewriteEngine On

		  # Si el archivo y la carpeta no existen hacer siguiente reescritura
		  RewriteCond %{REQUEST_FILENAME} !-f
		  RewriteCond %{REQUEST_FILENAME} !-d

		  # Redirecciona todas las peticiones a index
		  RewriteRule ^ index.php [QSA,L]`;

	fs.writeFileSync(`${path}/.htaccess`, data);
 }

 /**
 * Función que genera el archivos con las rutas de la página 
 */
const generarFileRoutingReal = async (entradas, path) => {
	let html = `<?php 
					$rutas = [`;
	for(let entrada of entradas){
		html += `'${entrada.url}' => ['${entrada.descripcion}', '${entrada.file}'],`;
	}
	html += `  ];
			?>`;
  
	fs.writeFileSync(path + '/routing.php', html);
  }

  const generarJSONIconImagen = async(req, res) =>{
	try{
		let params = req.body;
		let data = {
			logo: params.logo,
			icon: params.icon
		}

		let path = 'server/nichos/' + params.nombre + '/assets/json/configuracionGeneral.json';
		console.log('path', path);
		json.generarJsonNoticia(data, path);

		/**Actualizamos los campos en bd */
		let campos = {
			$set: {
				'jsonLogoIco.local': true,
				'jsonLogoIco.dev': false,
				'jsonLogoIco.prod': false,
			}
		}

		let general = await consultas.actualizacionCamposGeneral({_id: req.params.id, campo: campos});
		res.status(200).send({general, msj: 'Se creo el archivo icon y imagen'});	
	}catch(error){
	   log.fatal('Metodo: generarJSONIconImagen ' + JSON.stringify(req.body), error);
	   res.status(500).send({ error: 'Ocurrió un error al generar json de imagen e icono' });
	}
  }

  /**
   * Se elimina la configuracion general
   */
  const eliminarConfiguracionGeneralNicho = async(req, res) =>{
	 try{
		let params = req.body;
		await consultas.eliminarConfiguracionGeneral(params);
		fs.rmdirSync('server/nichos/' + params.nombre, { recursive: true, force: true });
		await uploads.subirCarpetasPruebas(params.command);
		res.status(200).send({msj: 'Se elimino configuracion general del nicho'});	
	 }catch(error){
		log.fatal('Metodo: eliminarConfiguracionGeneralNicho ' + JSON.stringify(req.body), error);
		res.status(500).send({ error: 'Ocurrió un error al eliminar la configuracion' });
	 }
  }

module.exports = {
	generateProyecto,
	generarCapetasProyecto,
	patchGeneralSitio,
	guardarFuenteNicho,
	subirArchivosProyecto,
	guardarLogoNicho,
	guardarIconNicho,
	generarRouting,
	subirModificaciones,
	actualizarColorFuentes,
	subirModificacionesDEV,
	generarJSONIconImagen,
	eliminarConfiguracionGeneralNicho
}