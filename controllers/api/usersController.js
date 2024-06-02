//reminder we are in EXPRESS now, so use require instead of import.
const debug = require("debug")("mern:controllers:api:usersController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { getUser } = require("../../config/checkToken");

const createJWT = (user) => {
	return jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });
};

const create = async (req, res) => {
	debug("body: %o", req.body);
	// const { name, email, password } = req.body;
	// const user = await User.create({ name, email, password });
	try {
		const user = await User.create(req.body);
		debug("user: %o", user);
		const token = createJWT(user);
		res.status(201).json(token);
		// res.status(201).json({ user });
	} catch (error) {
		debug("error: %o", error);
		res.status(500).json({ error });
	}
};

const login = async (req, res) => {
	// res.json({ msg: "login" });
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(401).json({ msg: "user not found" });
	}
	const match = await bcrypt.compare(password, user.password);
	if (match) {
		const token = createJWT(user);
		res.json(token);
	} else {
		res.status(401).json({ msg: "password incorrect" });
	}
};

const checkToken = (req, res) => {
	const user = getUser(req, res); //res.locals.user;
	res.json({ user });
};

module.exports = {
	create,
	login,
	checkToken,
};
