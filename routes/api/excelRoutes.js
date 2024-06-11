const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

router.post("/", async (req, res) => {
	const fileData = req.body;

	try {
		await pool.query("BEGIN");

		for (const row of fileData) {
			const { name, nric, unit, ord, service, vocation, team, q_code, q_type, q_date } = row;

			const personnelInsertQuery = `
				INSERT INTO personnel (name, nric, unit, ord, service, vocation, team)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT (nric) DO UPDATE SET
					name = EXCLUDED.name,
					unit = EXCLUDED.unit,
					ord = EXCLUDED.ord,
					service = EXCLUDED.service,
					vocation = EXCLUDED.vocation,
					team = EXCLUDED.team
				RETURNING person_id;
			`;

			const personnelValues = [name, nric, unit, ord, service, vocation, team];
			const personnelResult = await pool.query(personnelInsertQuery, personnelValues);
			const personId = personnelResult.rows[0].person_id;

			const authorisationInsertQuery = `
				INSERT INTO authorisation (p_id, q_code, q_type, q_date)
				VALUES ($1, $2, $3, $4)
			`;

			const authorisationValues = [personId, q_code, q_type, q_date];
			await pool.query(authorisationInsertQuery, authorisationValues);
		}

		await pool.query("COMMIT");
		res.status(200).json({ message: "Data uploaded successfully" });
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error uploading data:", error);
		res.status(500).json({ error: "Error uploading data" });
	}
});

module.exports = router;
