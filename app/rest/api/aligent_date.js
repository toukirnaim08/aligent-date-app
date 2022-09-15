const { validate } = require('jsonschema');

// Load files
const { dates_validation_schema } = require('./validation');
const { calculate_diffs, calculate_week_days } = require('../../services/svc_date');
const { json } = require('express');

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
     *                  start_date:
     *                      type: string
     *                      description: yyyy-mm-dd
     *                      example: "2021-05-23"
     *                  end_date:
     *                      type: string
     *                      description: yyyy-mm-dd
     *                      example: "2021-06-23"
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
			return res.status(400).send({
				result: null,
				error: error_message
			});
		}

		var start_date  = new Date(req.body.start_date);
		var end_date  = new Date(req.body.end_date);

		const results = await calculate_diffs(start_date, end_date)

		console.log("loggging " + JSON.stringify(results));

        return res.send({
			results: results
        });
    },
};

// Helper to validate json schema and perform basic non-null checks
function validate_json_schema(request_body) {
    error_message = null;
    try {
        result = validate(request_body, dates_validation_schema);
        result.errors.forEach(function (error) {
            if (error_message == null)
                error_message = error.stack;
            else
                error_message += ", " + error.stack;
        });

    } catch (e) {
        error_message = "invalid json format";
    }

    return error_message;
}
