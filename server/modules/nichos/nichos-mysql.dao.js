
const consulta = require('../../lib/api-mysql');

const guardarCategoriaNicho = async (conn, params) => {
    return await consulta.queryRaw('INSERT INTO Srfl_Categoria(Ctgr_Nombre, Ctgr_Estatus, Ctgr_FchaCrcn) VALUES(?, ?, CURRENT_TIMESTAMP()); SELECT LAST_INSERT_ID() as id;', [params.nombre, 1], conn);
}

module.exports = {
    guardarCategoriaNicho
}