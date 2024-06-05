const pool = require("../../config/database");
// const debug = require("debug")("pern:controllers:api:authorisationController");

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

//! dont really need this
const index = async (req, res) => {
	try {
		const result = await pool.query("SELECT * from authorisation");
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

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

// ALL supervisors can create. but last user can edit before signing.
// lock edit button in front end after sign???
// edit means re-sign; need to set IF condition to see who update/sign --> trainingIC or OIC.
// any edit will remove existing signature?
//* this edit includes all fields --> PUT
const edit = async (req, res) => {
	try {
		const { athId } = req.params; //personnelID
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

//TODO select all and sign (include WHERE ... )
//TODO setup if to change query text based on user type (instructor or trainingIC or OIC)
const sign = async (req, res) => {
	try {
		const { id } = req.params; //personnelID
		const { userId, qCode } = req.body; //should i use q_id or q_name or q_code
		//TODO change to WHERE ath_id=$
		const query = `
			UPDATE authorisation SET 
			training_ic_endorsement=$1, 
			training_ic_endorsement_timestamp=CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Singapore' 
			WHERE p_id=$2 AND q_code=$3
			RETURNING *`;
		//might have conflict between date UTC timezone and SG timezone
		const values = [userId, id, qCode];
		const result = await pool.query(query, values);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

module.exports = {
	create,
	index,
	sign,
	edit,
	show,
};
