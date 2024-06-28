const fs = require('fs');


const upload = async (req, res) =>{
    var fstream;
	let path = req.headers.path;
    let tipo = req.headers.tipo;
    let id = req.headers.id;

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

        let path_adicional = '';
        switch(tipo){
            case '1':
              path_adicional = 'fonts/';
              break;
            case '2':
            case '3':
              path_adicional = 'images/';
              copiarArchivoCMS(id, path_adicional, saved_filename, file);
              break;
        }

        let url = `server/nichos/${path}/${path_adicional}`;
        
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
                url:    path_adicional  + saved_filename,
                cms:    'images/' + id + '/' + saved_filename,
                tipo:  tipo
            });
        });
    });
}

/**
 * Enviamos el archivo al CMS para poder visualizarlo desde ahi
 */
copiarArchivoCMS = async (id, path, file, busboy) =>{
    try{
       let pathAbsolute = `../../server-images/public/images/${id}`;

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
    upload
};