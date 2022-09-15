
/**
 * calculate deffirences between two dates
 *
 * @param {Date} start_date
 * @param {Date} end_date
 *
 * @returns object
 */
 async function calculate_diffs(start_date, end_date) {

	let dayNumbers = "";

    const curDate = new Date(start_date.getTime());
    while (curDate <= end_date) {
		// getDay() returns The numebr of day in week (0 to 6).
		// ex. Sunday = 0 , Monday = 1 ..... Friday = 5
		dayNumbers += curDate.getDay().toString();
        curDate.setDate(curDate.getDate() + 1);
    }

	// We can use week sequence "1234560" to find out how many complete weeks
	const weekSequence = "1234560";
	var weeks = dayNumbers.split(weekSequence);

	// Similarly we can find out how many weekends as sunday = 0 and saturady = 6
	var weekends = dayNumbers.split(/[0,6]/);

	return {
		days: dayNumbers.length,
		week_days: dayNumbers.length - (weekends.length - 1),
		weeks: weeks.length -1,
		weekends : weekends.length -1
	}
  }

module.exports = {
	calculate_diffs
  }
