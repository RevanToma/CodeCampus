var express = require("express");
var router = express.Router();
const controller = require("./../../constrollers/web/auth-web-controller");
const { passport } = require("../../utils/passport");
router.get("/", controller.home);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth",
    failureFlash: { type: "danger", message: "Incorrect username or password" },
  }),
  // controller.loginUser
  (req, res) => {
    res.redirect("/profile");
  }
);
router.post("/register", controller.registerUser);
module.exports = router;
