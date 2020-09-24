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
      console.log(exUser);
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

router.post("/sign-in", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("signinError", info.message);
      return res.redirect("/");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send(200, {
        name:name,
        password:password,
        level:level
      });
    });
  })(req, res, next);
});

router.get("/sign-out", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
