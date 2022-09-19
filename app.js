require('dotenv').config()
// const redis = require('redis');
const express = require("express");

const { projectTitle } = require('./constants');

// Api controller
const aligentDateController = require('./app/rest/api/aligent_date');

const app = express();

// Parse application/json
app.use(express.json({ strict: false }))

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Configure swagger
swaggerJsdoc = require("swagger-jsdoc"),
	swaggerUi = require("swagger-ui-express");
var swaggerDocument = require('./swagger.json');
const swaggerSpecs = swaggerJsdoc(swaggerDocument);

// Configure logger class
app.log = require('bunyan').createLogger({
	name: 'default'
});

// Route: swaggerUi
const swaggerOption = {
	swaggerOptions: {
		defaultModelsExpandDepth: -1,
	}
};

// To check application is working
app.get('/', function (req, res) {
	res.send(projectTitle.NAME + " working")
})

// Route: swagger ui
app.use(
	"/" + projectTitle.NAME + '/apidocs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpecs, swaggerOption)
);

// Route: Date controller
app.post("/" + projectTitle.NAME + '/comparison', async (req, res) => {
	await aligentDateController.comparison(app, req, res);
});

// Route: handle 404
app.use(function (req, res, next) {
	console.debug(`404 ${req.method} ${req.path}`)

	res.status(404).send({
		status: 404,
		message: 'URL not found',
	});
});

// Route: Handle 500
app.use(function (err, req, res, next) {
	console.debug(`500 ${req.method} ${req.path}`)
	console.error(err)

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = err;

	// render the error page
	res.status(err.status || 500);
	res.json({ status: 500, message: err.message || 'Internal Server error' });
});

module.exports = app;
