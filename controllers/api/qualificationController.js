const pool = require("../../config/database");
// const debug = require("debug")("pern:controllers:api:qualificationController");

const create = async (req, res) => {
	try {
		const { user, q_name, q_code, task1, task2, task3 } = req.body;
		// debug("user", user);
		if (user !== ("admin" || "oic")) {
			res.status(401).json("No access rights");
			return;
		}
		const query = `INSERT INTO qualification
			 (q_name, q_code, task1, task2, task3) 
			 VALUES($1, $2, $3, $4, $5)
			 RETURNING *`;
		const values = [q_name, q_code, task1, task2, task3];
		const result = await pool.query(query, values);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const edit = async (req, res) => {
	try {
		const { q_id } = req.params;
		const { user, q_name, q_code, task1, task2, task3 } = req.body;
		if (user !== ("admin" || "oic")) {
			res.status(401).json("No access rights");
			return;
		}
		const query = `
			UPDATE qualification SET
			q_name=$2, 
			q_code=$3,
			task1=$4,
			task2=$5,
			task3=$6
			WHERE q_id=$1 
			RETURNING *`;
		const values = [q_id, q_name, q_code, task1, task2, task3];
		const result = await pool.query(query, values);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const index = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM qualification");
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const show = async (req, res) => {
	try {
		const { q_id } = req.params;
		let query = "SELECT * FROM qualification ";
		let values = [];
		if (q_id) {
			query += "WHERE q_id = $1";
			values = [q_id];
		}
		const result = await pool.query(query, values);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

module.exports = {
	index,
	create,
	edit,
	show,
};
