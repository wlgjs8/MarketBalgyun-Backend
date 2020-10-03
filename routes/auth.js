const express = require("express");
const passport = require("passport");
const bycrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/User");
const { NotExtended } = require("http-errors");
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/sign-up", isNotLoggedIn, async (req, res, next) => {
  const { name, password, level } = req.body;
  try {
    const exUser = await User.find({ name: name });
    if (exUser.length !== 0) {
      req.flash("sign up Error", "이미 가입된 이름입니다.");
      console.log("이미 가입된 이름입니다.");
      return res.send('이미 가입된 이름입니다.');
    }
    const hash = await bycrypt.hash(password, 12);
    await User.create({
      name,
      password: hash,
      level,
    });
    return res.send('정상 등록되었습니다.');
  } catch (error) {
    console.error(error);
    res.send('오류가 발생하였습니다.')
    return next(error);
  }
});

router.post("/log-in", async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const exUser = await User.findOne({ name: name });
    if (exUser) {
      const result = await bycrypt.compare(password, exUser.password);
      if (result) {
        console.log('sign in clear');
        const token = await jwt.sign({
          name: name,
        }, process.env.JWT_SECRET, {
          expiresIn: '10h',
          issuer: 'jih',
        });

        let payLoad = {
          name,
          token,
        };

        res.cookie('user', token).json({
          message: '로그인 성공',
          payLoad,
        });
        // res.status(200).json({
        //   message:'로그인 성공',
        //   payLoad,
        // });
      }
      else {
        res.json({
          message: '비밀번호가 일치하지 않습니다.',
        });
        res.end();
        console.log('비밀번호가 일치하지 않습니다.');
      }
    }
    else {
      res.json({
        message: '가입되지 않은 회원입니다.',
      });
      res.end();
      console.log('가입되지 않은 회원입니다.');
    }
  } catch (error) {
    res.json({
      message: 'DB Error',
    });
    res.end();
    console.error(error);
    //done(error);
  }

  // passport.authenticate("local", (authError, user, info) => {
  //   if (authError) {
  //     console.error(authError);
  //     return next(authError);
  //   }
  //   if (!user) {
  //     req.flash("signinError", info.message);
  //     return res.status(404);
  //   }
  //   return req.logIn(user, (loginError) => {
  //     if (loginError) {
  //       console.error(loginError);
  //       return next(loginError);
  //     }
  //     console.log({
  //       name: user.name,
  //       password: user.password,
  //       level: user.level,
  //     }); //debug
  //     return res.status(200).send({
  //       name: user.name,
  //       level: user.level,
  //     });
  //   });
  // })(req, res, next);
});

router.get("/log-out", async (req, res) => {
  const { name } = req.body;
  const token = await jwt.sign({
    name: name,
  }, process.env.JWT_SECRET, {
    expiresIn: '0',
    issuer: 'jih',
  });

  let payLoad = {
    name,
    token,
  }

  res.cookie('user', token).json({
    message:'로그아웃되었습니다.',
  });

  console.log('log out');

  // req.logout();
  // req.session.destroy();
  // console.log('12');
  //res.redirect("/");
});

router.delete("/sign-out", async (req, res) => {
  const currentUser = await User.findOne({ name: req.query.name });
  await User.deleteOne({ name: currentUser.name });
  //req.logout();
  //req.session.destroy();
  res.send('정상적으로 삭제되었습니다.');
});

module.exports = router;
