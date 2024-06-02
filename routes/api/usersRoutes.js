const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//*refactored to config/ensureLoggedIn
//create middleware function called checkToken to use in ALL check-token routes, e.g. /check-token
// const checkToken = (req, res, next) => {
// 	const header = req.get("Authorization");
// 	const token = header.replace("Bearer ", "");
// 	try {
// 		const payload = jwt.verify(token, process.env.SECRET);
// 		res.locals.user = payload.user;
// 		next();
// 	} catch (error) {
// 		console.log(error);
// 		res.status(401).json({ error });
// 	}
// };

//* refactor into config.
//check token at http://localhost:3000/api/users/check-token
//add in middleware for checkToken because i need to reuse checkToken for many different routes.
// router.get("/check-token", [checkToken], (req, res) => {
// 	const user = res.locals.user;
// 	res.json(user);
// });

// POST /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);

router.get("/check-token", [ensureLoggedIn], usersCtrl.checkToken);

module.exports = router;
