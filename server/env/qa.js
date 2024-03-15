const config = {
    app: {
        title: 'API-Arbitraje - QA Environment'
    },
    db: {
        uri: 'FMFSQLQAS',
        options: {
            user: 'usuario_interno',
            pass: 'Q73Nyudb@J34',
            dialect: 'mssql',
            instanceName: 'DBFMF',
            intialdb: 'ARBITRAJE',
            timestamps: false,
            freezeTableName: true
        },
        siid: {
            uri: 'FMFSQLQAS'
        }
	},
	dbIndp: {
        uri: 'FMFSQLQAS',
        options: {
            user: 'usuario_indp',
            pass: 'p66h279tLwnC',
            dialect: 'mssql',
            instanceName: 'PRIMARYDB',
            intialdb: 'FMF_INDP',
            timestamps: false,
            freezeTableName: true,
            database: 'FMF_INDP'
        }
    },
	dbSIID: {
        uri: 'FMFSQLQAS',
        options: {
            user: 'usuario_interno',
            pass: 'p66h279tLwnC',
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
            host: 'exchange.fmf.mx',
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
		host: '10.2.16.16',
		user: 'usrcomp',
		pass: 'L1inicio'
	},
    api:{
        intranet: 'http://10.2.16.16:6004/intranet'
    }
};

export default config