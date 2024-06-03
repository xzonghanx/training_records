const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

// /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/", usersCtrl.index);
// router.get("/check-token", [ensureLoggedIn], usersCtrl.checkToken);

module.exports = router;
