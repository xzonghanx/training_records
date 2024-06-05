const express = require("express");
const router = express.Router();
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

const authorisationCtrl = require("../../controllers/api/authorisationController");
const qualificationCtrl = require("../../controllers/api/qualificationController");

router.get("/", authorisationCtrl.index); //not used yet.
router.post("/", authorisationCtrl.create);
router.delete("/", authorisationCtrl.removeMany);

router.patch("/sign", authorisationCtrl.sign);
router.get("/qualifications", qualificationCtrl.index);

router.get("/:athId", authorisationCtrl.show);
router.put("/:athId", authorisationCtrl.edit);
router.delete("/:athId", authorisationCtrl.remove);

module.exports = router;
