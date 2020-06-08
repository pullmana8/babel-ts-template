var path = require('path')
var slsw = require('serverless-webpack')
var nodeExternals = require('webpack-node-externals')
var TerserPlugin = require('terser-webpack-plugin')
//var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    externals: [nodeExternals()],
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
//    plugins: [new ForkTsCheckerWebpackPlugin()],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
};