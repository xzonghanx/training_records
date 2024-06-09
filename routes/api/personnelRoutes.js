const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");

const personCtrl = require("../../controllers/api/personnelController");

router.post("/", [ensureLoggedIn], personCtrl.create);
router.get("/", [ensureLoggedIn], personCtrl.index);
router.get("/search", [ensureLoggedIn], personCtrl.search);
router.get("/teams", [ensureLoggedIn], personCtrl.teams);
router.delete("/", [ensureLoggedIn], personCtrl.removeMany);

router.get("/:id", [ensureLoggedIn], personCtrl.show);
router.delete("/:id", [ensureLoggedIn], personCtrl.removeOne);
router.put("/:id", [ensureLoggedIn], personCtrl.edit);

module.exports = router;

// router.get("/currency", personCtrl.currency);
// router.patch("/ORD", personCtrl.updateORD); //testing --> should try to automate this instead
