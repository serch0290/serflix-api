const mongoose = require('mongoose');

const usuario = "serch_nichos";
const password = "afwkCv2FPmydzROm";
const dbName = "Serflix_Nichos";


const init = () =>{
    mongoose.set('strictQuery', false);
    const uri = `mongodb+srv://${usuario}:${password}@cluster0.yh70p4t.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> console.log('conectado a mongodb')) 
            .catch(e => console.log('error de conexión', e));

    return mongoose;
}

const initProd = () =>{
    const dbNameProd = "Serflix_Nichos_Prod";
    mongoose.set('strictQuery', false);
    const uri = `mongodb+srv://${usuario}:${password}@cluster0.yh70p4t.mongodb.net/${dbNameProd}?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=> console.log('conectado a mongodb')) 
            .catch(e => console.log('error de conexión', e));

    return mongoose;
}

module.exports = {init, initProd}


