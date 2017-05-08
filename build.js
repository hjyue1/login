require('./server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var config = require("./config");
var webpack = require('webpack');

var webpackConfig_login = require('./login/webpack/index');
var compiler = webpack(webpackConfig_login);

