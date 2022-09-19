// Load files
const { validate_json_schema } = require('./validation');

// Load services
const { calculate_diffs, date_from_timezone } = require('../../services/svc_date');
const { save_value_in_cache, get_value_from_cache } = require('../../services/svc_cache');
const { create_hash } = require('../../services/svc_hash');

module.exports = {
	/**
	 * @swagger
	 * /aligent-date/comparison:
	 *   post:
	 *     summary: compare two dates.
	 *     description:
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *                  show_details_in_year_month_hour:
	 *                      type: bool
	 *                      description: is show difference into year, month etc
	 *                      example: true
	 *                  start_date:
	 *                      $ref: '#/components/schemas/date_object'
	 *                  end_date:
	 *                      $ref: '#/components/schemas/date_object'
	 *     responses:
	 *       200:
	 *         description: Results.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 result:
	 *                   type: string
	 */
	comparison: async function (app, req, res) {

		console.log("enviroment " + process.env.NODE_ENV);
		error_message = validate_json_schema(req.body);

		// If validation failed
		if (error_message != null) {
			app.log.error(JSON.stringify(error_message));

			return res.status(400).send({
				results: null,
				error: error_message
			});
		}

		const hash_key = create_hash(JSON.stringify(req.body)).toString();

		// Check whether the results in cache or not
		const cached_data = await get_value_from_cache(hash_key);
		if (cached_data != null || cached_data != undefined) {
			app.log.info("result found in cache " + cached_data);
			return res.send({
				results: cached_data
			});
		}


		// Create Date objects
		var start_date = await date_from_timezone(req.body.start_date.date,
			req.body.start_date.time,
			req.body.start_date.time_zone);

		var end_date = await date_from_timezone(req.body.end_date.date,
			req.body.end_date.time,
			req.body.end_date.time_zone);

		// If start date is greater than end date
		if (start_date > end_date) {
			app.log.info("Start date is greater than end date");

			return res.status(400).send({
				results: null,
				error: "Start date is greater than end date"
			});
		}

		// Calculate differences
		const results = await calculate_diffs(req.body.show_details_in_year_month_hour,
			start_date,
			end_date);

		app.log.info("results " + JSON.stringify(results));

		// We can save results in cache for few seconds so that we dont need to calculate
		// same operation with same values over and over again
		await save_value_in_cache(hash_key, results, 10);

		return res.send({
			results: results
		});
	},
};


// sawgger schema

/**
 * @swagger
 * components:
 *   schemas:
 *     date_object:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: yyyy-mm-dd
 *           example: 2012-04-20
 *         time:
 *           type: string
 *           description: HH-MM-SS
 *           example: 16:00:30
 *         time_zone:
 *           type: string
 *           description: Time Zone
 *           example: Australia/Adelaide
 */
