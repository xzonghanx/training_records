const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");

const qualificationCtrl = require("../../controllers/api/qualificationController");

router.get("/", [ensureLoggedIn], qualificationCtrl.index);
router.post("/", [ensureLoggedIn], qualificationCtrl.create);
router.put("/:q_id", [ensureLoggedIn], qualificationCtrl.edit);
router.get("/:q_id", [ensureLoggedIn], qualificationCtrl.show);

module.exports = router;
