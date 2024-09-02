const fs = require('fs');

/** Log4js */
const log4js = require('log4js');
log4js.configure('./server/lib/log4js.json');
const log = log4js.getLogger('arbitraje');
const Jimp = require('jimp');

const upload = async (req, res) =>{
    var fstream;
	let path = req.headers.path;
    let tipo = req.headers.tipo;
    let id = req.headers.id;
    let name = req.headers.name;

    req.pipe(req.busboy);

    /**
     * Si viene definido un campo con el nombre "filename", tomamos el valor
     */
    req.busboy.on('field', function (fieldname, val) {
		if (fieldname == 'filename') {
            custom_filename = val
        }
    })

    req.busboy.on('file', function (fieldname, file, filename) {
        let saved_filename = filename.filename;

        let path_adicional = '', url = '';
        switch(tipo){
            case '1':
              path_adicional = 'fonts/';
              url = `server/nichos/${path}/${path_adicional}`;
              break;
            case '2':
            case '3':
              path_adicional = 'images/';
              url = `server/nichos/${path}/${path_adicional}`;
              copiarArchivoCMS(id, path_adicional, saved_filename, file);
              break;
            case '4':
                url = `server/nichos/${path}/`;
                copiarArchivoCMS(id, path, saved_filename, file);
        }

        if (!fs.existsSync(url)){
            fs.mkdirSync(url, { recursive: true });
        }
        
        fstream = fs.createWriteStream(url + filename.filename);
        
        file.pipe(fstream);
        fstream.on('error', function (err) {
            res.status(500).send({ message: err });
        });
        fstream.on('close', function () {
            // Agregamos el nombre del archivo en la respuesta
            res.status(200).send({
                message:        'El archivo se ha subido con éxito.',
                filename:       saved_filename,
                url:    'assets/' + path_adicional + saved_filename,
                path: path,
                tipo:  tipo
            });
        });
    });
}

const transformarImagenesResoluciones = async (req, res) =>{

    try{
        const sharp = require('sharp');
        const inputPath = 'server/nichos/' + req.body.url;
        let name = req.body.filename.split('.')[0];
        const root = 'server/nichos/';
        const outputPathOriginal = req.body.path +'/' + req.body.filename + '.webp';
        const outputPath400 =  req.body.path +'/' + name + '_400.webp';
        const outputPath800 =  req.body.path +'/' + name + '_800.webp';

        await sharp(inputPath)
                .webp({ quality: 90 }) // Comprimir a WebP con calidad 95%
                .toFile(root + outputPathOriginal);

        await sharp(inputPath)
            .resize(400) // Redimensionar imagen
            .webp({ quality: 85 }) // Comprimir a WebP con calidad 75%
            .toFile(root + outputPath400);

        await sharp(inputPath)
            .resize(800) // Redimensionar imagen
            .webp({ quality: 85 }) // Comprimir a WebP con calidad 75%
            .toFile(root + outputPath800);
            
        res.status(200).send({img400: outputPath400, img800: outputPath800})
    }catch(error){
        log.fatal('Ocurrió un error al generar imagenes', error);
        res.status(500).send({ error: 'Ocurrió un error al generar imagenes' });
    }
}

/**
 * Enviamos el archivo al CMS para poder visualizarlo desde ahi
 */
copiarArchivoCMS = async (id, path, file, busboy) =>{
    try{
       let pathAbsolute = `../server-imagenes/public/${path}`;

        if (!fs.existsSync(pathAbsolute)){
            fs.mkdirSync(pathAbsolute, { recursive: true });
        }

        let fstream = fs.createWriteStream(pathAbsolute + '/' + file);
                
        busboy.pipe(fstream);
        fstream.on('close', function () {
            console.log('Archivo enviado al CMS correctamente');
        });
   }catch(error){
    console.log('Error al enviar al CMS', error);
   }
}

module.exports = {
    upload,
    transformarImagenesResoluciones
};