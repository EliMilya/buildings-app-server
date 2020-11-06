const express = require("express");
const controller = require("../controllers/buildings");
const passport = require("passport");
const router = express.Router();

// Protected building route.
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getAllBuildings
);

module.exports = router;
