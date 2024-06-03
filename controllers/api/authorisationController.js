const pool = require("../../config/database");

//assume that only instructor can create records, and hence immediately signs off --> check&balance
// * delink the signing portion, all supervisors can create.
// const { qCode, qType, qDate, task1, task2, task3, userSign } = req.body;
// const query = `INSERT INTO authorisation
// 	 (p_id, q_code, q_type, q_date, task1, task2, task3, instructor_sign, instructor_ts)
// 	 VALUES($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Singapore')
// 	 RETURNING *`;
// const values = [id, qCode, qType, qDate, task1, task2, task3, userSign];

const create = async (req, res) => {
	try {
		const { id } = req.params; //personnelID
		const { qCode, qType, qDate, task1, task2, task3 } = req.body;
		const query = `INSERT INTO authorisation
			 (p_id, q_code, q_type, q_date, task1, task2, task3) 
			 VALUES($1, $2, $3, $4, $5, $6, $7)
			 RETURNING *`;
		const values = [id, qCode, qType, qDate, task1, task2, task3];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

//dont really need this
const index = async (req, res) => {
	try {
		const result = await pool.query("SELECT * from authorisation");
		res.status(200).json(result.rows);
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
		const { id } = req.params; //personnelID
		const { athId, qCode, qType, qDate, task1, task2, task3 } = req.body;
		const query = `
			UPDATE authorisation SET
			q_code=$3, 
			q_type=$4,
			q_date=$5,
			task1=$6,
			task2=$7,
			task3=$8
			WHERE p_id=$1 AND ath_id=$2 
			RETURNING *`;
		const values = [id, athId, qCode, qType, qDate, task1, task2, task3];
		const result = await pool.query(query, values);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

/*
const updateAuthorisation = async (qId, updates) => {
	const fields = Object.keys(updates);
	const values = Object.values(updates);
  
	let setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
	values.push(qId);
  
	const query = `
	  UPDATE authorisation
	  SET ${setClause}
	  WHERE q_id = $${fields.length + 1}
	  RETURNING *;
	`;
	const res = await pool.query(query, values);
	return res.rows[0];
*/

//TODO select all and sign (include WHERE ... )
//TODO setup if to change query text based on user type (instructor or trainingIC or OIC)
const sign = async (req, res) => {
	try {
		const { id } = req.params; //personnelID
		const { userId, qCode } = req.body; //should i use q_id or q_name or q_code
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
};
