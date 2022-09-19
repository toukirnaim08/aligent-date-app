const { dateConfigs } = require('../../constants');

/**
 * Calculate deffirences between two dates
 *
 * @param {bool} show_details_in_year_month_hour
 * @param {Date} start_date
 * @param {Date} end_date
 *
 * @returns object
 */
async function calculate_diffs(show_details_in_year_month_hour, start_date, end_date) {

	// Diff in seconds
	let diff_in_secods = (end_date - start_date) / 1000;

	let all_days_numbers_as_string = "";

	const temp_date = new Date(start_date.getTime());
	while (temp_date <= end_date) {
		// getDay() returns an integer corresponding to the day of the week.
		// Ex. 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
		all_days_numbers_as_string += temp_date.getDay().toString();

		// Increase date by 1 day
		temp_date.setDate(temp_date.getDate() + 1);
	}

	// We can use week sequence "1234560" to find out how many complete weeks
	var all_complete_weeks = all_days_numbers_as_string.split(dateConfigs.COMPLETE_WEEK_SEQUENCE);

	// Similarly we can find out how many weekends as sunday = 0 and saturady = 6
	var all_weekends = all_days_numbers_as_string.split(/[0,6]/);

	return generate_result(
		show_details_in_year_month_hour,
		diff_in_secods,
		all_days_numbers_as_string.length,
		all_days_numbers_as_string.length - (all_weekends.length -1),
		all_complete_weeks.length -1
	);
}

/**
 * Create Date object using date, time and time zone.
 *
 * @param {string} date
 * @param {string} time
 * @param {string} time_zone
 *
 * @returns {Date}
 */

async function date_from_timezone(date, time, time_zone) {
	full_date = date + " " + time + " +0930";
    return new Date((typeof full_date === "string" ? new Date(full_date) : full_date).toLocaleString("en-US", {timeZone: time_zone}));
}

/**
 * Private Method
 */

/**
 * Private Mathods
 * Generate result
 *
 * @param {bool} show_details_in_year_month_hour
 * @param {int} total_days_in_seconds
 * @param {int} total_days
 * @param {int} total_weekends
 * @param {int} total_weeks
 *
 * @returns object
 */
 function generate_result(show_details_in_year_month_hour, total_days_in_seconds, total_days, total_weekends, total_weeks) {
	let total_week_days = total_days - total_weekends;
	console.log("generate_result " + show_details_in_year_month_hour);
	return {
		days: {
			total: total_days,
			details: show_details_in_year_month_hour ? days_to_second_minutes_hours_years(total_days, total_days_in_seconds) : null
		},
		week_days: {
			total: total_week_days,
			details: show_details_in_year_month_hour ? days_to_second_minutes_hours_years(total_week_days) : null
		},
		complete_weeks: {
			total: total_weeks,
			details: show_details_in_year_month_hour ? days_to_second_minutes_hours_years(total_weeks * 7) : null
		}
	}
}

/**
 * Private Method
 */

/**
 * Convert days into one of seconds, minutes, hours, years.
 *
 * @param {int} days
 * @param {int} seconds
 *
 * @returns string
 */
function days_to_second_minutes_hours_years(days, seconds=null) {
	// All units to convert days into on of seconds, minites, hours or years
	var units = {
		"year": 365*24*60*60,
		"month": 30*24*60*60,
		"week": 7*24*60*60,
		"day": 24*60*60,
		"hour": 60*60,
		"minute": 60,
		"second": 1
	}

	// Convert days into seconds
	var value = seconds==null ? days * dateConfigs.SECONDS_IN_A_DAY : seconds;

	var convertedValues = [];

	for(let unit in units) {
		var p =  Math.floor(value/units[unit]);

		// If single
		// Ex. 1 year or 1 month
		if(p == 1) convertedValues.push(p + " " + unit);
		// If multiple then we can add extra s
		// Ex. 2 years or 2 months
		if(p >= 2) convertedValues.push(p + " " + unit + "s");

		// Update value
		value %= units[unit]
	  }

	return convertedValues.join(' ');
}

module.exports = {
	calculate_diffs,
	date_from_timezone
}
