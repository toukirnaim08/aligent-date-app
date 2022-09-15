/**
 * This file starts web server
 */
 require('dotenv').config()

 const { defaultConfig } = require('./constants');
 const port = defaultConfig.port;

 const app = require('./app');

 app.listen(port, function () {
	 app.log.info(`server listening on http://localhost:${port}`);
	 app.log.info('Ready.');
 });

 module.exports = app;
