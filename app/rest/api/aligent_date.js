// Load files
const { validate_json_schema } = require('./validation');
const { calculate_diffs, date_from_timezone } = require('../../services/svc_date');

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

		error_message = validate_json_schema(req.body);

		if (error_message != null) {
			console.log("loggging " + JSON.stringify(error_message));
			return res.status(400).send({
				result: null,
				error: error_message
			});
		}

		var start_date = await date_from_timezone(req.body.start_date.date,
			req.body.start_date.time,
			req.body.start_date.time_zone);

		var end_date = await date_from_timezone(req.body.end_date.date,
			req.body.end_date.time,
			req.body.end_date.time_zone);

		const results = await calculate_diffs(req.body.show_details_in_year_month_hour,
			start_date,
			end_date);

		console.log("loggging " + req.body.show_details_in_year_month_hour);

		return res.send({
			results: results
		});
	},
};

function convertTZ(date, tzString) {
	return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

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
 *           example: 00:00:30
 *         time_zone:
 *           type: string
 *           description: Time Zone
 *           example: Asia/Dhaka
 */
