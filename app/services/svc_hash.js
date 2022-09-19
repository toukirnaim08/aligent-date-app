/**
 * Create hash from values.
 *
 * @param {string} body
 *
 * @returns string
 */
function create_hash(body) {
	return body.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

module.exports = {
	create_hash
}
