require("dotenv").config();
var createError = require("http-errors");
const session = require("express-session");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const exphbs = require("express-handlebars");
const { passport, setUser } = require("./utils/passport");

require("./config/moongose");
require("./config/sequelize");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(setUser);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.flash = (type, message) => {
    req.session.flash = { type, message };
  };

  if (req.session.flash) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
  }

  next();
});
app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
});

app.use("/", require("./routes/web/home-web-router"));
app.use("/login", require("./routes/web/login-web-router"));
app.use("/profile", require("./routes/web/profile-web-router"));
app.use("/community", require("./routes/web/community-web-router"));
app.use("/users", require("./routes/web/users-web-router"));
app.use("/api/profile", require("./routes/api/profile-api-router"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
