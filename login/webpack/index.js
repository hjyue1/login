var config = require("../../config");

if (config.NODE_ENV === 'dev') {
  module.exports = require('./dev.config.js');
} else {
  module.exports = require('./prod.config.js');
}