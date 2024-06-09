const pool = require("../../config/database");
const debug = require("debug")("pern:controllers:api:personnelController");

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

const search = async (req, res) => {
	const { search } = req.query;
	// debug("search: %s", search);
	try {
		// let query = "SELECT * FROM personnel p LEFT JOIN authorisation a ON p.person_id = a.p_id ";
		let query = `
			SELECT p.*, a.*,
				CASE 
					WHEN (CURRENT_DATE - (a.q_date)) < 365 THEN 'CL1'
					WHEN (CURRENT_DATE - (a.q_date)) < 730 THEN 'CL2'
					WHEN (CURRENT_DATE - (a.q_date)) < 1095 THEN 'CL3'
					WHEN (CURRENT_DATE - (a.q_date)) >= 1095 THEN 'Lapse'
					ELSE 'Not qualified yet'
				END AS currency_lvl
			FROM personnel p
			LEFT JOIN (
				SELECT a.p_id, MAX(a.q_date) as latest_q_date
				FROM authorisation a
				GROUP BY a.p_id
				) latest_authorisation ON p.person_id = latest_authorisation.p_id
				LEFT JOIN authorisation a ON p.person_id = a.p_id AND a.q_date = latest_authorisation.latest_q_date
			
		`;
		let values = [];
		if (search) {
			query += "WHERE p.name ILIKE $1 OR p.nric ILIKE $2 ";
			values = [`%${search}%`, `%${search}%`];
		}
		// debug("fullquery: %s", query);
		const result = await pool.query(query, values);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

/*
const currency = async (req, res) => {
	try {
		let query = `
			SELECT a.p_id, MAX(a.q_date) as latest_q_date,
			CASE
				WHEN (CURRENT_DATE - MAX(a.q_date)) < 365 THEN 'CL1'
				WHEN (CURRENT_DATE - MAX(a.q_date)) < 730 THEN 'CL2'
				WHEN (CURRENT_DATE - MAX(a.q_date)) < 1095 THEN 'CL3'
				ELSE 'lapse'
			END AS currency_level
			FROM authorisation a
			GROUP BY a.p_id
		`;
		const result = await pool.query(query);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};
*/

const teams = async (req, res) => {
	try {
		const query = `
			SELECT team, COUNT(*) as team_count
			FROM personnel
			GROUP BY team
		`;
		const result = await pool.query(query);
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const show = async (req, res) => {
	try {
		const { id } = req.params;
		const query = `SELECT 
		p.*,
		a.*,
		latest_authorisation.latest_q_date,
		CASE 
			WHEN (CURRENT_DATE - latest_authorisation.latest_q_date) < 365 THEN 'CL1'
			WHEN (CURRENT_DATE - latest_authorisation.latest_q_date) < 730 THEN 'CL2'
			WHEN (CURRENT_DATE - latest_authorisation.latest_q_date) < 1095 THEN 'CL3'
			ELSE 'lapse'
		END AS currency_lvl
	FROM 
		personnel p
	LEFT JOIN (
		SELECT 
			a.p_id, 
			MAX(a.q_date) as latest_q_date
		FROM 
			authorisation a
		GROUP BY 
			a.p_id
	) AS latest_authorisation ON p.person_id = latest_authorisation.p_id
	LEFT JOIN authorisation a ON p.person_id = a.p_id
	WHERE 
		p.person_id = $1;
	`;
		const values = [id];
		const result = await pool.query(query, values);
		// const result = await pool.query(
		// 	`SELECT * FROM personnel p
		// 	LEFT JOIN authorisation a
		// 	ON p.person_id = a.p_id
		// 	WHERE p.person_id = $1`,
		// 	[id]
		// );
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

const edit = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, nric, unit, ord, vocation, team, service } = req.body;
		const query = `
		UPDATE personnel SET 
		name = $2,
		nric = $3,
		unit = $4,
		ord = $5,
		service = $6,
		vocation = $7,
		team = $8
		WHERE person_id=$1 
		RETURNING *`;
		const values = [id, name, nric, unit, ord, service, vocation, team];
		debug("values %s", values);
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const removeOne = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query("DELETE from personnel WHERE person_id = $1 RETURNING *", [id]);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const removeMany = async (req, res) => {
	const { ids } = req.body; //this should be an array
	if (ids.length < 1) {
		return res.status(400).json({ error: "Invalid or empty IDs array" });
	}
	try {
		const query = "DELETE from personnel WHERE person_id = ANY($1::int[]) RETURNING *";
		const values = [ids];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

//TODO change update ORD to just by date for all, and auto if possible, instead of by batch/team; can use nodejs cron.
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
	search,
	show,
	edit,
	removeOne,
	removeMany,
	updateORD,
	// currency,
	teams,
};
