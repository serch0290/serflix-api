const config = {
    app: {
        title: 'API-Arbitraje - Development Environment'
    },
    db: {
        uri: '10.3.14.154',
        options: {
            user: 'usuario_interno',
            pass: 'D3v2021@',
            dialect: 'mssql',
            instanceName: 'DBFMF',
            intialdb: 'ARBITRAJE',
            timestamps: false,
            freezeTableName: true
        },
        siid: {
            uri: '10.3.14.154'
        }
	},
	dbIndp: {
        uri: '10.3.14.154',
        options: {
            user: 'usuario_indp',
            pass: '$1nDp.2019$',
            dialect: 'mssql',
            instanceName: 'PRIMARYDB',
            intialdb: 'FMF_INDP',
            timestamps: false,
            freezeTableName: true,
            database: 'FMF_INDP'
        }
    },
	dbSIID: {
        uri: '10.3.14.154',
        options: {
            user: 'usuario_interno',
            pass: 'D3v2021@LX',
            dialect: 'mssql',
            instanceName: 'PRIMARYDB',
            intialdb: 'SIID',
            timestamps: false,
            freezeTableName: true,
            database: 'SIID'
        }
    },
    log: {
        format: 'dev',
        fileLogger: {
            directoryPath: process.cwd(),
            fileName: 'app.log',
            maxsize: 10485760,
            maxFiles: 2,
            json: false
        }
    },
    mailer: {
        smtpConfig: {
            host: 'correoexch.fmf.mx',
            port: 587,
            secure: false,
            auth: {
                user: 'smtp_dev_dep',
                pass: '$mtpDEVd3p'
            },
            tls: { rejectUnauthorized: false }
        }
	},
	serverArbitraje: {
		host: '10.3.14.64',
		user: 'usrdevfmf',
		pass: 'uD3vNod18'
	},
    api:{
        intranet:       'http://10.3.14.64:6004/intranet',
        multimedia_aws: 'https://2kcttwnqf4.execute-api.us-west-2.amazonaws.com/development/'
    }
};

export default config