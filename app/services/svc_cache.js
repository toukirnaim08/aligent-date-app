require('dotenv').config()
const redis = require('redis');

var redisClient;

// Connect redis
(async () => {
	redisClient = redis.createClient({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	});

	redisClient.on("error", (error) => console.error(`Error : ${error}`));

	await redisClient.connect();
})();

/**
 * Save values.
 *
 * @param {string} key
 * @param {string} value
 * @param {int} time_to_live
 *
 * @returns object
 */
async function save_value_in_cache(key, value, time_to_live = 10) {
	return await redisClient.setEx(key, time_to_live, JSON.stringify(value));
}

/**
 * Get values using key.
 *
 * @param {string} key
 *
 * @returns string
 */
async function get_value_from_cache(key) {
	const jsonString = await redisClient.get(key);

	if (jsonString) {
		return JSON.parse(jsonString);
	}
}

module.exports = {
	save_value_in_cache,
	get_value_from_cache
}
