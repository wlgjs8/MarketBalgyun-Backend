const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { isVerified } = require('./middlewares');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    //console.log(req);
    //res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.isVerified = (req, res, next) => {
  let token = req.cookies.user;
  let decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    next();
  } else {
    res.status(403).json({
      message: '인증되지 않은 사용자 입니다.',
    });
  }
};
