
module.exports = {
    /**
     * @swagger
     * /aligent-date/comparison:
     *   get:
     *     summary: compare two dates.
     *     description:
	 *     parameters:
     *       - name: start_date
     *         description: dd-mm-yyyy
	 *         example: 01-02-2000
     *         in: path
     *         required: true
     *         type: string
	 *       - name: end_date
     *         description: dd-mm-yyyy
	 *         example: 01-03-2000
     *         in: path
     *         required: true
     *         type: string
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

		console.log("loggging");
        return res.send({
            result: "test"
        });
    },
};
