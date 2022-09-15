exports.dates_validation_schema = {
    "type": "object",
    "properties": {
        "start_date": {
            "type": "string",
            "maxLength": 10,
			"minLength": 8
        },
        "end_date": {
            "type": "string",
            "maxLength": 10,
			"minLength": 8
        },
    },
    "required": ["start_date", "end_date"],
    "additionalProperties": false
};
