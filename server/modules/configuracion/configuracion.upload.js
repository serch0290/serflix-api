const subirCarpetasPruebas = async(command) =>{
    return new Promise(async(resolve, reject) => {
        try{
            const { exec } = require('child_process');
            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
            
                if (stderr) {
                    reject(stderr);
                }
            
                resolve(stdout);
            });

        }catch(error){
          reject(error);
        }
   })
}

module.exports = {
    subirCarpetasPruebas
}