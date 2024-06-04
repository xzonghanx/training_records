const express = require("express");
const router = express.Router();
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

const personCtrl = require("../../controllers/api/personnelController");
// const authorisationCtrl = require("../../controllers/api/authorisationController");

router.post("/", personCtrl.create);
router.get("/", personCtrl.index);
router.delete("/", personCtrl.removeMany);

router.get("/:id", personCtrl.show);
router.delete("/:id", personCtrl.removeOne);
router.put("/:id", personCtrl.edit);

module.exports = router;

router.patch("/ORD", personCtrl.updateORD); //testing --> should try to automate this instead
