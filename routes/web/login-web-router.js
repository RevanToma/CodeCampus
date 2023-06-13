var express = require("express");
var router = express.Router();
const controller = require("../../constrollers/web/login-web-controller");
const { passport } = require("../../utils/passport");

router.get("/", controller.home);

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: { type: "danger", message: "Incorrect username or password" },
  }),
  controller.loginUser
);

router.post("/register", controller.registerUser);
module.exports = router;
