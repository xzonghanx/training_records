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

const sign = async (req, res) => {
	debug("body", req.body);
	const { user, athId } = req.body;
	debug("user", user);
	debug("athId", athId);
	let signer = "";
	if (user.u_appt === "oic") {
		signer = "officer";
	} else if (user.u_appt === "trainingIC") {
		signer = "trainingic";
	} else if (user.u_appt === "instructor") {
		signer = "instructor";
	}

	try {
		// debug("signer", signer);
		// const query = `
		// 	UPDATE authorisation SET
		// 	${signer}_sign=$1,
		// 	${signer}_ts=CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Singapore'
		// 	WHERE ath_id=$2
		// 	RETURNING *`;
		const query = `
			UPDATE authorisation SET
			${signer}_sign=$1,
			${signer}_ts=CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Singapore'
			WHERE ath_id=ANY($2::int[])
			RETURNING *`;
		//might have conflict between date UTC timezone and SG timezone
		const values = [user.u_sign, athId];
		// const values = [user.u_name, athId]; //TODO switch to this after amending schema
		const result = await pool.query(query, values);
		debug("result", result.rows[0]);
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
