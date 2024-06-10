const pool = require("../../config/database");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;
const jwt = require("jsonwebtoken");
const createJWT = (user) => {
	return jwt.sign({ user }, process.env.SECRET, { expiresIn: "60m" });
};
const debug = require("debug")("pern:controllers:api:usersController");

const index = async (req, res) => {
	try {
		const result = await pool.query(`
			SELECT user_id, u_name, u_email, u_unit, u_appt, u_sign
			FROM users`); //when getting users, remove password from the fields
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const create = async (req, res) => {
	try {
		// debug("body: %o", req.body);
		const { access, name, email, password, unit, appt } = req.body;
		if (access !== "admin" || access !== "oic") {
			res.status(401).json("No access rights");
			return;
		}
		const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
		const text = `INSERT INTO users (u_name, u_email, u_pass, u_unit, u_appt) 
			VALUES($1, $2, $3, $4, $5) 
			RETURNING user_id, u_name, u_email, u_unit, u_appt, u_sign`;
		const values = [name, email, hashedPass, unit, appt];
		const result = await pool.query(text, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const values = [email];
		const query = `SELECT * FROM users WHERE u_email = $1`;
		const result = await pool.query(query, values);

		if (result.rows.length < 1) {
			res.status(401).json({ msg: "invalid login" });
		}
		debug("user: %o", result.rows[0]);
		const user = result.rows[0];

		const isMatch = await bcrypt.compare(password, user.u_pass);
		if (isMatch) {
			delete user.u_pass; //remove password from being passed to client
			const token = createJWT(user);
			res.status(200).json(token);
		} else {
			res.status(401).json({ msg: "invalid login" });
		}
	} catch (err) {
		debug("Error authenticating user:", err);
	}
};

const filters = async (req, res) => {
	try {
		const unitOptions = await pool.query("SELECT DISTINCT unit FROM personnel");
		const serviceOptions = await pool.query("SELECT DISTINCT service FROM personnel");
		const vocationOptions = await pool.query("SELECT DISTINCT vocation FROM personnel");
		const teamOptions = await pool.query("SELECT DISTINCT team FROM personnel");
		const qCodeOptions = await pool.query("SELECT DISTINCT q_code FROM authorisation");
		const qTypeOptions = await pool.query("SELECT DISTINCT q_type FROM authorisation");
		const currencyLvlOptions = [
			{ currency_lvl: "CL1" },
			{ currency_lvl: "CL2" },
			{ currency_lvl: "CL3" },
			{ currency_lvl: "Lapse" },
			{ currency_lvl: "Not qualified yet" },
		];

		res.json({
			unitOptions: unitOptions.rows,
			serviceOptions: serviceOptions.rows,
			vocationOptions: vocationOptions.rows,
			teamOptions: teamOptions.rows,
			qCodeOptions: qCodeOptions.rows,
			qTypeOptions: qTypeOptions.rows,
			currencyLvlOptions: currencyLvlOptions,
		});
	} catch (err) {
		console.error("Error fetching filter options", err.stack);
		res.status(500).json({ err });
	}
};

module.exports = {
	create,
	index,
	login,
	filters,
};
