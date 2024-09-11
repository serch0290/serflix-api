const models = require('../../models/nicho');

const guardarFooter = params =>{
    return models.footer.create(params);
}

const agregarNuevoFooter = async params =>{
    return await models.footer.findByIdAndUpdate(
        params._id,
        params.campo,
        { new: true, runValidators: true }
    );
}

const getFooter = async params =>{
    return await models.footer.findOne({nicho: params.id}).lean();
}

module.exports = {
    guardarFooter,
    agregarNuevoFooter,
    getFooter
}