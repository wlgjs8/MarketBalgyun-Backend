const express = require("express");
const passport = require("passport");
const bycrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/User");
const { NotExtended } = require("http-errors");

const router = express.Router();

router.post("/sign-up", isNotLoggedIn, async (req, res, next) => {
  const { name, password, level } = req.body;
  try {
    const exUser = await User.find({ name: name });
    if (exUser.length !== 0) {
      req.flash("sign up Error", "이미 가입된 name입니다.");
      console.log("이미 가입된 name입니다.");
      return res.status(404);
    }
    const hash = await bycrypt.hash(password, 12);
    await User.create({
      name,
      password: hash,
      level,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/log-in", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("signinError", info.message);
      return res.status(404);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log({
        name:user.name,
        password:user.password,
        level:user.level,
      }); //debug
      return res.send(200, {
        name:user.name,
        level:user.level,
      });
    });
  })(req, res, next);
});

router.get("/log-out", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.post("/sign-out", isLoggedIn, (req, res) => {
  const currentUser = await User.find({ name: name });
  User.deleteOne({ name:currentUser.name });
  req.logout();
  req.session.destroy();
});

module.exports = router;
