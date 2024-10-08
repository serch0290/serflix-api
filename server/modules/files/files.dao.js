const models = require('../../models/nicho');

const listadoFiles = params =>{
    return models.files.find().sort({ path: 1 });
}

const guardarFile = params =>{
    return models.files.create(params);
}

const actualizarFile = async params =>{
    return await models.files.findByIdAndUpdate(params._id, params, { new: true, runValidators: true });
}

module.exports = {
    listadoFiles,
    guardarFile,
    actualizarFile
}