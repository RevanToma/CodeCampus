const express = require("express");
const router = express.Router();
const controller = require("../../constrollers/web/users-web-controller");
const { requireAuth } = require("../../utils/passport");

router.get("/:username", requireAuth, controller.home);

module.exports = router;
