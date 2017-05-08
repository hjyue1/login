//  enable runtime transpilation to use ES6/7 in node

var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var _config;

try {
  _config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(_config);