const pool = require("../../config/database");
const debug = require("debug")("pern:controllers:api:authorisationController");

const create = async (req, res) => {
	try {
		const { personId, q_code, q_type, q_date, task1, task2, task3 } = req.body;
		const query = `INSERT INTO authorisation
			 (p_id, q_code, q_type, q_date, task1, task2, task3) 
			 VALUES($1, $2, $3, $4, $5, $6, $7)
			 RETURNING *`;
		const values = [personId, q_code, q_type, q_date, task1, task2, task3];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

/* dont need this
const index = async (req, res) => {
	try {
		const result = await pool.query("SELECT * from authorisation");
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};
*/

const show = async (req, res) => {
	const { athId } = req.params;
	try {
		const result = await pool.query("SELECT * from authorisation WHERE ath_id = $1", [athId]);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const edit = async (req, res) => {
	try {
		const { athId } = req.params; 
		const { q_code, q_type, q_date, task1, task2, task3 } = req.body;
		const query = `
			UPDATE authorisation SET
			q_code=$2, 
			q_type=$3,
			q_date=$4,
			task1=$5,
			task2=$6,
			task3=$7
			WHERE ath_id=$1 
			RETURNING *`;
		const values = [athId, q_code, q_type, q_date, task1, task2, task3];
		const result = await pool.query(query, values);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const sign = async (req, res) => {
	// debug("body", req.body);
	const { user, athId } = req.body;
	// debug("user", user);
	// debug("athId", athId);
	let signer = "";
	if (user.u_appt === "oic") {
		signer = "officer";
	} else if (user.u_appt === "trainingIC") {
		signer = "trainingic";
	} else if (user.u_appt === "instructor") {
		signer = "instructor";
	}

	try {
		const query = `
			UPDATE authorisation SET
			${signer}_sign=$1,
			${signer}_ts=CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Singapore'
			WHERE ath_id=ANY($2::int[])
			RETURNING *`;

		const values = [user.u_sign, athId];

		const result = await pool.query(query, values);
		debug("result", result.rows[0]);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const remove = async (req, res) => {
	try {
		const { athId } = req.params;
		const result = await pool.query("DELETE from authorisation WHERE ath_id = $1 RETURNING *", [
			athId,
		]);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const removeMany = async (req, res) => {
	const { athId } = req.body;
	debug("athId", athId);
	try {
		const query = "DELETE from authorisation WHERE ath_id = ANY($1::int[]) RETURNING *";
		const values = [athId];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

module.exports = {
	create,
	// index,
	sign,
	edit,
	show,
	remove,
	removeMany,
};
