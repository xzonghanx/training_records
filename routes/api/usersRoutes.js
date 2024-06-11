const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", [ensureLoggedIn], usersCtrl.create);
router.get("/", [ensureLoggedIn], usersCtrl.index);
router.post("/login", usersCtrl.login);
router.get("/filters", usersCtrl.filters);

module.exports = router;
