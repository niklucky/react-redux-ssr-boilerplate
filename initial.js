var fs = require('fs');
var LOCAL_CONFIG = './src/config.local.js';
var CONTENT = 'module.exports = {};\n';

if (!fs.existsSync(LOCAL_CONFIG)) {
	console.log('Creating local config...');
    fs.writeFileSync(LOCAL_CONFIG, CONTENT);
}