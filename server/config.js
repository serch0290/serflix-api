'use strict';

const _ = require('lodash')
const chalk = require('chalk')
const glob = require('glob')

const config = {
    app: {
        title: 'API-ARBITRAJE',
        clave: 'APIARBITRAJE'
    },
    db: {
        promise: global.Promise
    },
    port: process.env.PORT,
    host: process.env.HOST || '0.0.0.0',
    domain: process.env.DOMAIN,
    // sessionSecret should be changed for security measures and concerns
    // sessionSecret: process.env.SESSION_SECRET || 'femextroll',
    // Lusca config
    csrf: {
        csrf: false,
        csp: false,
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        xssProtection: true
    }
};

/**
 * Validate NODE_ENV existence
 */
function validateEnvironmentVariable(){
    let environmentFiles = glob.sync('./server/env/' + process.env.NODE_ENV + '.js');

    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
            process.env.NODE_ENV = 'development';
        }
    }
    // Reset console color
    console.log(chalk.white(''));
}

validateEnvironmentVariable();

let environmentConfig = require(`./env/${process.env.NODE_ENV}`).default || {};


module.exports = _.merge(config, environmentConfig);