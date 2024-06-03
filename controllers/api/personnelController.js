const pool = require("../../config/database");

//can choose to select only specific fields instead.
const index = async (req, res) => {
	try {
		const result = await pool.query(
			`SELECT * FROM personnel p
			LEFT JOIN authorisation a 
			ON p.person_id = a.p_id`
		);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const show = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			`SELECT * FROM personnel p 
			LEFT JOIN authorisation a 
			ON p.person_id = a.p_id 
			WHERE p.person_id = $1`,
			[id]
		);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows);
		} else {
			res.status(404).json({ error: "personnel not found" });
		}
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const create = async (req, res) => {
	try {
		const { name, nric, unit, ord, vocation, team, service } = req.body;
		const query = `INSERT INTO personnel(name, nric, unit, ord, vocation, team, service) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
		const values = [name, nric, unit, ord, vocation, team, service];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

//change update ORD to just by date for all, and auto if possible, instead of by batch/team; can use nodejs cron.
const updateORD = async (req, res) => {
	try {
		const { team } = req.body;
		const query = `
		UPDATE personnel
		SET service = 
			CASE
				WHEN ord < CURRENT_DATE 
				THEN 'NSmen'
				ELSE service
			END
		WHERE team = $1
		RETURNING *`;
		const result = await pool.query(query, [team]);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

module.exports = {
	create,
	index,
	show,
	updateORD,
};
