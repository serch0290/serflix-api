'use strict';

const http = require('http')
const chalk = require('chalk')
// import http from 'http';
// import chalk from 'chalk';


const config = require('./config');
const app = require('./app');

const server = {};
/**
 * Inicia server del app
 * Crea: MAGO
 */
server.start = () => {
    const server = http.createServer(app);

    server.listen(config.port);

    // Logging initialization
    console.log('--');
    console.log(chalk.green(config.app.title));
    console.log(chalk.green(`Enviroment:    ${process.env.NODE_ENV}`));
    console.log(chalk.green(`Server:        ${(process.env.NODE_ENV === 'secure' ? 'https://' : 'http://')}${config.host}:${config.port}`));
    console.log(chalk.green(`Database:      ${config.db.uri}`));
    console.log(chalk.green(`App version:   1.0.0`));
    console.log('--');
};



try{
    server.start();
}catch(err){
    console.error(err);
}