var express = require("express");
var router = express.Router();
const { requireAuth } = require("./../../utils/passport");
const controller = require("../../constrollers/web/profile-web-controller");
/* GET home page. */
router.get("/", requireAuth, controller.home);
router.post("/start-path/:id", controller.startPath);

module.exports = router;
