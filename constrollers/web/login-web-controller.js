const User = require("../../models/mysql/user-model");
const bcrypt = require("bcrypt");

module.exports = {
  home: async (req, res) => {
    if (req.user) {
      return res.redirect("/profile");
    }
    res.render("login/home", { title: "logga in / registrera" });
  },
  registerUser: async (req, res) => {
    const username = req.body.username;

    const userExist = await User.findOne({ where: { username } });

    if (userExist) {
      req.session.flash = { type: "danger", message: "User already exists" };
      return res.redirect("/login");
    }
    if (req.body.password !== req.body.confirmPassword) {
      req.session.flash = {
        type: "danger",
        message: "passwords does not match!",
      };
      return res.redirect("/login");
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username,
      passwordHash,
    });
    if (user) {
      req.session.flash = { type: "success", message: "User Created" };
    }

    res.redirect("/login");
  },
  loginUser: async (req, res, next) => {
    res.redirect("/profile");
  },
};
