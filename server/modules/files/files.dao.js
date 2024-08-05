const models = require('../../models/nicho');

const listadoFiles = params =>{
    return models.files.find().sort({ path: 1 });
}

const guardarFile = params =>{
    return models.files.create(params);
}

module.exports = {
    listadoFiles,
    guardarFile
}