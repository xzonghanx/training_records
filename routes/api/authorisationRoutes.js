const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");

const authorisationCtrl = require("../../controllers/api/authorisationController");

// router.get("/", authorisationCtrl.index);
router.post("/", [ensureLoggedIn], authorisationCtrl.create);
router.delete("/", [ensureLoggedIn], authorisationCtrl.removeMany);

router.patch("/sign", [ensureLoggedIn], authorisationCtrl.sign);

router.get("/:athId", [ensureLoggedIn], authorisationCtrl.show);
router.put("/:athId", [ensureLoggedIn], authorisationCtrl.edit);
router.delete("/:athId", [ensureLoggedIn], authorisationCtrl.remove);

module.exports = router;
