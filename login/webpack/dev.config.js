require('babel-polyfill');
var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var publicPath = path.resolve(__dirname, 'public');
var config = require("../../config");

var webpackConfig = {
	devtool: 'eval',
	entry: {
        main: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://${config.host}:${config.port}/login`,
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: path.join(__dirname, '../dist'),
        // match the output path

        publicPath: '/'
        // match the output `publicPath`
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [path.join(__dirname, 'src'),path.join(__dirname, 'bin')],
                use: [ 'babel-loader' ],
                exclude: [nodeModulesPath],
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.css$/, loader: "style!css-loader!less-loader" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback:'style-loader', use:'css!autoprefixer-loader?browsers=last 2 version!sass'})},
            { test: /\.less$/, loader: ExtractTextPlugin.extract({fallback:'style-loader', use:"css-loader!less-loader"})},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]},
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({name:'commons', filename:'commons.js'}),
            new webpack.DefinePlugin({
            __ENV__: config.NODE_ENV,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new ExtractTextPlugin('main.css'),
        ],
        resolve: {
            // Allow to omit extensions when requiring these files
            alias : {
                    'helpers' : path.join(__dirname, 'src/helpers'),
                    'actions' : path.join(__dirname, 'src/actions'),
            },
            extensions: ["", ".js", ".jsx"],
        },
}
module.exports = webpackConfig;