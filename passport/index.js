const local = require("./localStrategy");
const User = require("../models/User");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.name);
    console.log('session created : ', user.name);
    console.log(done);
  });

  passport.deserializeUser((name, done) => {
    User.findOne({ name: name })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
};
