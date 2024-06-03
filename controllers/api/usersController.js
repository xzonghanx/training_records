const pool = require("../../config/database");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;
const jwt = require("jsonwebtoken");
const createJWT = (user) => {
	return jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });
};
const debug = require("debug")("pern:controllers:api:usersController");

const index = async (req, res) => {
	try {
		const result = await pool.query(`
			SELECT user_id, u_name, u_email, u_unit, u_appt, u_sign
			FROM users`); //when getting users, remove password from the fields, select just id, name, email
		res.status(200).json(result.rows);
	} catch (err) {
		console.error("Error executing query", err.stack);
		res.status(500).json({ err });
	}
};

const create = async (req, res) => {
	try {
		// debug("body: %o", req.body);
		const { name, email, password, unit, appt } = req.body;
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

module.exports = {
	create,
	index,
	login,
};
