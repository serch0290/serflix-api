
const fs = require('fs');

/**
 * 
 * @param {} Se genera json de la noticia
 * @param {*} res 
 */
const generarJsonNoticia = async(noticia, path) =>{
    try{
        fs.writeFileSync(path, JSON.stringify(noticia));
    }catch(error){
        throw error;
    }
}

module.exports = {
    generarJsonNoticia
}