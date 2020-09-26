var createError = require("http-errors");
var express = require("express");
var path = require("path");
const passport = require("passport");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
var connect = require("./models");
// const bodyParser = require('body-parser');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var passportConfig = require("./passport");
var generalProductRouter = require("./routes/generalProduct");
var customerRouter = require("./routes/customers");
var traderRouter = require("./routes/trader");
var generalCategoryRouter = require("./routes/generalCategory");
var saleLogRouter = require("./routes/saleLog");
var consignProductRouter = require("./routes/consignProduct");
var searchProductRouter = require("./routes/searchProduct");
var saledProductRouter = require("./routes/saledProduct");

var app = express();
connect();
passportConfig(passport);
const cors = require("cors");
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieParser(process.env.COOKIE_SECRET)));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: 'secret here',
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/generalProduct", generalProductRouter);
app.use("/customer", customerRouter);
app.use("/trader", traderRouter);
app.use("/generalCategory", generalCategoryRouter);
app.use("/saleLog", saleLogRouter);
app.use("/consignProduct", consignProductRouter);
app.use("/searchProduct", searchProductRouter);
app.use("/saledProduct", saledProductRouter);

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
