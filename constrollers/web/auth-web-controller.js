const User = require("./../../models/mysql/user-model");
const flash = require("express-flash");
module.exports = {
  home: async (req, res) => {
    res.render("auth/home", { title: "logga in / registrera" });
  },
  registerUser: async (req, res) => {
    await User.sync();
    const username = req.body.username;
    const password = req.body.password;
    // TODO: hash the password before storing it, don't store plaintext passwords
    // const passwordHash = someHashFunction(password);

    const userExist = await User.findOne({ where: { username } });

    if (userExist !== null) {
      req.flash("info", "Username already exists");
      res.redirect("/");
      return;
    }

    await User.create({
      username,
      passwordHash: password, // replace this with passwordHash when you have a hash function
    });

    req.flash("info", "User created");
    res.redirect("/");
  },
};
