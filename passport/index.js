const local = require('./localStrategy');
const User = require('../models/User');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.ID);
	});

	passport.deserializeUser((ID, done) => {
		User.findOne({ ID:ID }[0])
		.then(user => done(null, user))
		.catch(err => done(err));
	});

	local(passport);
};