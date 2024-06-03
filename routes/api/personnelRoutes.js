const express = require("express");
const router = express.Router();
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

const personCtrl = require("../../controllers/api/personnelController");
const authorisationCtrl = require("../../controllers/api/authorisationController");

router.post("/", personCtrl.create);
router.get("/", personCtrl.index);
router.get("/:id", personCtrl.show);
router.put("/:id/edit", personCtrl.edit);

router.get("/authorisations", authorisationCtrl.index); //dont really need this
router.patch("/ORD", personCtrl.updateORD); //testing --> should try to automate this instead

router.post("/:id/newQ", authorisationCtrl.create);
router.patch("/:id/sign", authorisationCtrl.sign);
router.put("/:id/edit", authorisationCtrl.edit); //change routes for this edit.

module.exports = router;
