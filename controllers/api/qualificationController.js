const pool = require("../../config/database");
// const debug = require("debug")("pern:controllers:api:qualificationController");

const index = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM qualification");
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

module.exports = {
	index,
};
