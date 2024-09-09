const models = require('../../models/nicho');

const guardarMenu = params =>{
    return models.menu.create(params);
}

const agregarNuevoMenu = async params =>{
    return await models.menu.findByIdAndUpdate(
        params._id,
        params.campo,
        { new: true, runValidators: true }
    );
}

const getMenu = async params =>{
    return await models.menu.findOne({nicho: params.id}).lean();
}

module.exports = {
    guardarMenu,
    agregarNuevoMenu,
    getMenu
}