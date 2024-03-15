const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const config = {
    mode: 'development',
    entry: './server',
    // entry: path.resolve(__dirname, 'server'),
    externals: [nodeExternals()],
    target: 'node',
    node: {
        __dirname: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
        //publicPath: '/dist/'
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname)],
        extensions: ['.js'],
        descriptionFiles: ['package.json'],
    },
    // module: {
    //     rules: [{
    //         test: /\.js?$/,
    //         loader: 'babel-loader'
    //     }]
    // },
    plugins: []
};

// if(process.env.NODE_ENV === 'development'){
//     config.plugins.push(new WebpackShellPlugin({
//         onBuildEnd: ['pm2 stop api-intranet']
//     }));
// }

module.exports = config;