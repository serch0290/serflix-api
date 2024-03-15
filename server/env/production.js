const config = {
    app: {
        title: 'API-INTRANET'
    },
    db: {
        uri: 'FMF',
        options: {
            user: 'usuario_interno',
            pass: 'fmf@2005',
            dialect: 'mssql',
            instanceName: 'DBFMF',
            intialdb: 'ARBITRAJE',
            timestamps: false,
            freezeTableName: true
        }
    },
	dbIndp: {
        uri: 'LIGAMX',
        options: {
            user: 'usuario_indp',
            pass: '$1ndp.2019.Prmy$',
            dialect: 'mssql',
            instanceName: 'PRIMARYDB',
            intialdb: 'FMF_INDP',
            timestamps: false,
            freezeTableName: true,
            database: 'FMF_INDP'
        }
    },
	dbSIID: {
        uri: 'LIGAMX',
        options: {
            user: 'usuario_interno',
            pass: '16prmry@12',
            dialect: 'mssql',
            instanceName: 'PRIMARYDB',
            intialdb: 'SIID',
            timestamps: false,
            freezeTableName: true,
            database: 'SIID'
        }
    },
    port: process.env.PORT || 6004,
    host: '0.0.0.0',
    domain: process.env.DOMAIN,
    log: {
        // logging with Morgan - https://github.com/expressjs/morgan
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: process.env.LOG_FORMAT || 'combined',
        fileLogger: {
            directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
            fileName: process.env.LOG_FILE || 'app.log',
            maxsize: 10485760,
            maxFiles: 10,
            json: false
        }
    },
    mailer: {
        smtpConfig: {
            host: 'correoexch.fmf.mx',
            port: 587,
            secure: false,
            auth: {
                user: 'smtp_prd_dep',
                pass: '$mtpPRDd3p'
            },
            tls: { rejectUnauthorized: false }
        }
    },
	serverArbitraje: {
		host: '10.3.14.77',
		user: 'usrmifmf',
		pass: 'uMiNod19'
	},
    api:{
        intranet: 'http://10.3.14.113:6004/intranet',
        multimedia_aws: 'https://2kcttwnqf4.execute-api.us-west-2.amazonaws.com/production/'
    }
};

export default config