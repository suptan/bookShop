const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  ALLOW_LOG_LEVEL: '"debug"',
  NODE_ENV: '"development"',
});
