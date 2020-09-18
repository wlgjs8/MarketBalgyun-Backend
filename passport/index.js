const local = require('./localStrategy');
const User = require('../models/User');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.name);
	});

	passport.deserializeUser((name, done) => {
		User.findOne({ name:name })
		.then(user => done(null, user))
		.catch(err => done(err));
	});

	local(passport);
};