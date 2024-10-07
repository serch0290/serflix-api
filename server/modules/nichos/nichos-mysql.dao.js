
const consulta = require('../../lib/api-mysql');

const guardarCategoriaNicho = async (conn, params) => {
    return await consulta.queryRawAlone('INSERT INTO Srfl_Categoria(Ctgr_Nombre, Ctgr_Estatus, Ctgr_FchaCrcn) VALUES(?, ?, CURRENT_TIMESTAMP())', [params.nombre, 1], conn);
}

const guardarNoticia = async(conn, params) =>{
    return await consulta.queryRawAlone('INSERT INTO Srfl_Noticias(Ntcs_Titulo, Ntcs_Descripcion, Ntcs_Url, Ntcs_EsttPblc, Ntcs_TipoCtgr, Ntcs_Estatus, Ntcs_FchaCrcn) VALUES(?, ?, ?, 1, ?, 1, CURRENT_TIMESTAMP())', 
                                [params.h1, params.descripcion, params.url, params.portada,  1], conn);
}

const actualizarNoticia = async(conn, params) =>{
    return await consulta.queryRawAlone('UPDATE Srfl_Noticias SET Ntcs_Titulo = ?, Ntcs_Descripcion = ?, Ntcs_Url = ?, Ntcs_TipoCtgr = ? WHERE Ntcs_IDNoticia = ?', 
                                        [params.h1, params.descripcion, params.url, params.portada,  params.idNoticia], conn);
}

const guardarCategoria = async(conn, params) => {
    return await consulta.queryRawAlone('INSERT INTO Srfl_NtcsCtgr(NtCt_IDNoticia, NtCt_IDCategoria, NtCt_Estatus, NtCt_FchaCrcn) VALUES(?, ?, 1, CURRENT_TIMESTAMP())', 
                                [params.idNoticia, params.idCategoria], conn);
}

const publicarNoticia = async(conn, params)=>{
    return await consulta.queryRawAlone('UPDATE Srfl_Noticias SET Ntcs_EsttPblc = ?, Ntcs_FchaPblc = CURRENT_TIMESTAMP() WHERE Ntcs_IDNoticia = ?', 
                                        [params.estatus, params.idSQL], conn);
}

const guardarImagenes = async(conn, params)=>{
    return await consulta.queryRawAlone('INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)VALUES(?, ?, ?, ?, 1, CURRENT_TIMESTAMP())', 
                                        [params.idNoticia, params.idResolucion, params.url, params.resolucion], conn);
}

module.exports = {
    guardarCategoriaNicho,
    guardarNoticia,
    guardarCategoria,
    actualizarNoticia,
    publicarNoticia,
    guardarImagenes
}