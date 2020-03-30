const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  ALLOW_LOG_LEVEL: '"debug"',
  NODE_ENV: '"development"',
  PROXY_URL: '"https://cors-anywhere.herokuapp.com/"',
  ENABLED_PROXY: '"ON"',
  RESOURCE_URL: '"https://json-bin.netlify.com/books.json"',
});
