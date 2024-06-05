const express = require("express");
const router = express.Router();
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

const authorisationCtrl = require("../../controllers/api/authorisationController");
const qualificationCtrl = require("../../controllers/api/qualificationController");

router.get("/", authorisationCtrl.index); //not used yet.
router.post("/", authorisationCtrl.create);

router.patch("/sign", authorisationCtrl.sign); //sign many
router.get("/qualifications", qualificationCtrl.index);

router.get("/:athId", authorisationCtrl.show);
router.put("/:athId", authorisationCtrl.edit);

//CHANGE TO FOLLOW RESTFULAPI, USE ATHID, PUT PERSONID IN BODY.
// router.delete("/:athid"", authorisationCtrl.delete");
router.patch("/:athid/sign", authorisationCtrl.sign); //uses params

module.exports = router;
