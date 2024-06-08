const express = require("express");
const router = express.Router();
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

const qualificationCtrl = require("../../controllers/api/qualificationController");

router.get("/", qualificationCtrl.index);
router.post("/", qualificationCtrl.create);
router.put("/:q_id", qualificationCtrl.edit);
router.get("/:q_id", qualificationCtrl.show);

module.exports = router;
