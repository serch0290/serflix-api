const models = require('../../models/nicho');

const guardarMenu = params =>{
    return models.menu.create(params);
}

module.exports = {
    guardarMenu
}