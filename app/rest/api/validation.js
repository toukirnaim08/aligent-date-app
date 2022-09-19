const { validate } = require('jsonschema');

const dates_validation_schema = {
    "type": "object",
    "properties": {
        "date": {
            "type": "string",
            "maxLength": 10,
			"minLength": 8
        },
        "time": {
            "type": "string",
            "maxLength": 8,
			"minLength": 6
        },
		"time_zone": {
            "type": "string",
			"minLength": 2
        },
    },
    "required": ["date", "time", "time_zone"],
    "additionalProperties": false
};

// Helper to validate json schema and perform basic non-null checks
function validate_json_schema(request_body) {
    error_message = null;
    try {
        result_start_date = validate(request_body.start_date, dates_validation_schema);
		result_end_date= validate(request_body.end_date, dates_validation_schema);

        result_start_date.errors.forEach(function (error) {
            if (error_message == null)
                error_message = "start_date " + error.stack;
            else
                error_message += ", start_date " + error.stack;
        });

		result_end_date.errors.forEach(function (error) {
            if (error_message == null)
                error_message = "end_date "+ error.stack;
            else
                error_message += ", end_date " + error.stack;
        });

    } catch (e) {
        error_message = "Invalid json format";
    }

    return error_message;
}

module.exports = {
	validate_json_schema
}
