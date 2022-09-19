const request = require("supertest");
const app = require("../app");

// Date comparison - basic test
test("1", () => {
	expect(true);
	const url = "/aligent-date/comparison";
	const body = {
		show_details_in_year_month_hour: true,
		start_date: {
			date: "2022-04-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		},
		end_date: {
			date: "2022-05-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		}
	};

	const result = {
		days: {
			total: 31,
			details: "1 month"

		},
		week_days: {
			total: 8,
			details: "1 week 1 day"
		},
		complete_weeks: {
			total: 3,
			details: "3 weeks"
		}
	};

	return request(app)
		.post(url)
		.send(body)
		.then(response => {
			// Validate if we have valid response
			expect(response.statusCode).toBe(200);
			// Assert result
			expect(response.body.results).toStrictEqual(result);
		});
});

// Date comparison - basic test
test("2", () => {
	expect(true);
	const url = "/aligent-date/comparison";
	const body = {
		show_details_in_year_month_hour: false,
		start_date: {
			date: "2022-04-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		},
		end_date: {
			date: "2022-05-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		}
	};

	const result = {
		days: {
			total: 31,
			details: null // as show_details_in_year_month_hour = false

		},
		week_days: {
			total: 8,
			details: null // as show_details_in_year_month_hour = false
		},
		complete_weeks: {
			total: 3,
			details: null // as show_details_in_year_month_hour = false
		}
	};

	return request(app)
		.post(url)
		.send(body)
		.then(response => {
			// Validate if we have valid response
			expect(response.statusCode).toBe(200);
			// Assert result
			expect(response.body.results).toStrictEqual(result);
		});
});



// Date comparison - with missing value
test("3", () => {
    expect(true);
	const url = "/aligent-date/comparison";
	const body = {
		show_details_in_year_month_hour: true,
		start_date: {
			// Missing Date
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		},
		end_date: {
			date: "2022-05-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		}
	};

	return request(app)
		.post(url)
		.send(body)
		.then(response => {
			// Validate if we have valid response
			expect(response.statusCode).toBe(400);
			// Assert error
			expect(response.body.error).toBe("start_date instance requires property \"date\"");
		});
});


// Date comparison - End date is less than start date
test("4", () => {
	expect(true);
	const url = "/aligent-date/comparison";
	const body = {
		show_details_in_year_month_hour: true,
		start_date: {
			date: "2022-05-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		},
		end_date: {
			date: "2022-04-20", // End date is less than start date
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		}
	};

	return request(app)
		.post(url)
		.send(body)
		.then(response => {
			// Validate if we have valid response
			expect(response.statusCode).toBe(400);
			// Assert error
			expect(response.body.error).toBe("Start date is greater than end date");
		});
});


// Date comparison - with dodgy date value
test("5", () => {
    expect(true);
	const url = "/aligent-date/comparison";
	const body = {
		show_details_in_year_month_hour: true,
		start_date: {
			date: 11, // Dodgy date
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		},
		end_date: {
			date: "2022-04-20",
			time: "16:00:30",
			time_zone: "Australia/Adelaide"
		}
	};

	return request(app)
		.post(url)
		.send(body)
		.then(response => {
			// Validate if we have valid response
			expect(response.statusCode).toBe(400);
			// Assert error
			expect(response.body.error).toBe("start_date instance.date is not of a type(s) string");
		});
});
