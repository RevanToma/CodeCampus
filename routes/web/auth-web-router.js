var express = require("express");
var router = express.Router();
const controller = require("./../../constrollers/web/auth-web-controller");

router.get("/", controller.home);
router.post("/", controller.registerUser);
module.exports = router;
