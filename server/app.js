'use strict';

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const _ = require('lodash');
const config = require('./config');
const logger = require('./lib/logger');
//Load all routes dinamycally
const path = require('path');
const fs = require('fs');
var busboy = require('connect-busboy');
const app = express();


app.use(busboy());


//Enable logger if enabled in the configuration file
if (_.has(config, 'log.format')) {
    app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
}

// Configure Body Parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

//Configure helmet
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
}));

app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({
    maxAge: 15778476,
    includeSubDomains: true,
    force: true
}));

app.disable('x-powered-by');

// Configure CORS
app.use((req, res, next) => {
    let allowedOrigins = ['http://localhost:6020', 'http://localhost:4200', 'http://localhost:6003', 'http://10.3.14.64:6020', 'http://dev.extranet.fmf.mx', 'http://10.3.14.64:6035', 'http://10.3.14.64:6036', 'http://localhost:6035', 'http://localhost:6036'];
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Idl");
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, Idl");
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({});
    }

    next();
});


// Routes
// Modificación para hacer recursiva la estructura de los archivos
//Ruta para la carga de archivos
let router = express.Router();
const leer_carpeta = (folder = '') => {
    let ruta = folder !== '' ? `./server/modules/${folder}` : `./server/modules`
    let excludes = ['api.js', 'linked.js', 'DS_Store'];
    let pathModules = path.resolve(ruta);
    return fs.readdirSync(pathModules).filter(file => (file.indexOf('.') !== 0 && !excludes.includes(file)));
}

//Función para la recursividad
const checa_carpeta = (folder = '') => {
    let models = leer_carpeta(folder);
    //Recorremos los archivos del directorio
    for (let model of models) {
        let ruta = folder !== '' ? `${folder}/${model}` : model;
        //Checamos si es un direcotrio o un archivo
        let is_dir = fs.lstatSync(`./server/modules/${ruta}`).isDirectory()
        if (is_dir) {
            //Si es directorio lo volvemos a analizar en busca de más niveles
            ruta = folder === '' ? `/${ruta}` : ruta;
            checa_carpeta(ruta)
        } else {
            //Si es archivo lo agregamos a la colección de rutas
            if (ruta.includes('routes')) {
                let routesModule = require(`./modules${ruta}`);
                router.use(`${folder}`, routesModule);
            }
        }
    }
}

checa_carpeta()

app.use(`/${process.env.PREFIX}`, router);

app.use('/', express.static(__dirname + '/public'));
//Catch route not found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Response error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;