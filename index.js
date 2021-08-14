/*eslint no-process-env:0*/

// Set default node environment to development
require('dotenv').config();
var env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development');

//if(env === 'development' || env === 'test') {
// Register the Babel require hook
// require('babel-register');
//}

// Export the application
exports = module.exports = require('./app');
