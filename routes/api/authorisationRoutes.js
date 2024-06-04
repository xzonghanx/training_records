const express = require("express");
const router = express.Router();
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

const authorisationCtrl = require("../../controllers/api/authorisationController");
const qualificationCtrl = require("../../controllers/api/qualificationController");

router.get("/", authorisationCtrl.index); //not used yet.
router.patch("/sign", authorisationCtrl.sign); //sign many

router.get("/qualifications", qualificationCtrl.index);

router.post("/:id", authorisationCtrl.create);
router.put("/:id", authorisationCtrl.edit); //change routes for this edit.
// router.delete("/:id"", authorisationCtrl.delete");
router.patch("/:id/sign", authorisationCtrl.sign); //uses params

module.exports = router;
