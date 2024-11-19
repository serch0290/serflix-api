const models = require('../../models/nicho');

const guardarPrivacidad = params =>{
    return models.privacidad.create(params);
}

const actualizarPrivacidad = async params =>{
    return await models.privacidad.findByIdAndUpdate(
        params._id,
        params.campo,
        { new: true, runValidators: true }
    );
}

const getPrivacidad = async params =>{
    return await models.privacidad.find({nicho: params.id}).lean();
}

module.exports = {
    guardarPrivacidad,
    actualizarPrivacidad,
    getPrivacidad
}