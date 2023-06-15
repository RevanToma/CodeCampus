const express = require("express");
const router = express.Router();

const controller = require("../../constrollers/api/profile-api-controller");

router.post("/complete-step", controller.completeStep);

module.exports = router;
