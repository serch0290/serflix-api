'use strict';

const fs = require('fs');
const chalk = require('chalk');
const winston = require('winston');
const _ = require('lodash');

const config = require('./../config');


// Lista de formatos validos para el logging
const validFormats = [
    'combined',
    'common',
    'dev',
    'short',
    'tiny'
];

// Instantiating the default winston application logger with the Console
// transport
let logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            colorize: true,
            showLevel: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ],
    exitOnError: false
});

// A stream object with a write function that will call the built-in winston
// logger.info() function.
// Useful for integrating with stream-related mechanism like Morgan's stream
// option to log all HTTP requests to a file
logger.stream = {
    write: msg => {
        logger.info(msg);
    }
};

/**
 * Instantiate a winston's File transport for disk file logging
 * Crea: MAGO
 * @returns {boolean}
 */
logger.setupFileLogger = function(){
    let fileLoggerTransport = this.getLogOptions();

    if(!fileLoggerTransport) {
        return false;
    }

    try{
        // Check first if the configured path is writable and only then
        // instantiate the file logging transport
        if(fs.openSync(fileLoggerTransport.filename, 'a+')){
            logger.add(winston.transports.File, fileLoggerTransport);
        }

        return true;
    }catch(err){
        if(process.env.NODE_ENV !== 'test'){
            console.log();
            console.log(chalk.red('An error has occured during the creation of the File transport logger.'));
            console.log(chalk.red(err));
            console.log();
        }

        return false;
    }
};

/**
 * The options to use with winston logger
 * Crea: MAGO
 * @returns {*}
 */
logger.getLogOptions = function() {

    let _config = _.clone(config, true);
    let configFileLogger = _config.log.fileLogger;

    if(!_.has(_config, 'log.fileLogger.directoryPath') || !_.has(_config, 'log.fileLogger.fileName')){
        console.log('unable to find logging file configuration');

        return false;
    }

    let logPath = configFileLogger.directoryPath + '/' + configFileLogger.fileName;

    return{
        level: 'debug',
        colorize: false,
        filename: logPath,
        timestamp: true,
        maxsize: configFileLogger.maxsize ? configFileLogger.maxsize : 10485760,
        maxFiles: configFileLogger.maxFiles ? configFileLogger.maxFiles : 2,
        json: (_.has(configFileLogger, 'json')) ? configFileLogger.json : true,
        eol: '\n',
        tailable: true,
        showLevel: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
    };
};

/**
 * The options to use with morgan logger
 * Crea: MAGO
 * @returns {{stream: {write: function(*=)}|*}}
 */
logger.getMorganOptions = function(){
    return {
        stream: logger.stream
    };
};

/**
 * The format to use with the logger
 * Crea: MAGO
 * @returns {string}
 */
logger.getLogFormat = function(){
    let format = config.log && config.log.format ? config.log.format.toString() : 'combined';

    // make sure we have a valid format
    if(!_.includes(validFormats, format)){
        format = 'combined';

        if(process.env.NODE_ENV !== 'test'){
            console.log();
            console.log(chalk.yellow('Warning: An invalid format was provided. The logger will use the default format of "' + format + '"'));
            console.log();
        }
    }

    return format;
};

logger.setupFileLogger();

module.exports = logger;