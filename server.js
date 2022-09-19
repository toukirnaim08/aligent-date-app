/**
 * This file starts web server
 */
 require('dotenv').config()

 const { defaultConfig, projectTitle } = require('./constants');

 // Configs
 const port = defaultConfig.port;
 const project_title = projectTitle.NAME;

 const app = require('./app');

 app.listen(port, function () {
	 app.log.info(`server listening on http://localhost:${port}`);
	 app.log.info(`Swagger ui on http://localhost:${port}/${project_title}/apidocs`);
	 app.log.info('Ready.');
 });

 module.exports = app;
