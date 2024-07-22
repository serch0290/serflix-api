

const queryRaw = (sql, params, conn) => {
    const sqlStatements = sql.split(';');
    return new Promise( async (resolve, reject) => {
        let result;
        for(let statement of sqlStatements){
            if (statement.trim() !== '') {
                console.log('query: ', statement);
                try{
                    await conn.query(statement, params, (error, result) => {
                        if (error) reject(error);
                        console.log('resultado: ', result);
                        result = result;
                    });
                }catch(error){
                    console.log('Errir: ', error);
                }
                
            }  
        }
        resolve(result);
    });
}
/*
const queryRaw = (sql, params, conn) => {
    return new Promise( (resolve, reject) => {
        conn.query(sql, params, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        );    
    })
}*/

module.exports = {
    queryRaw
}