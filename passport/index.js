const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.ID);
	});

	passport.deserializeUser((id, done) => {
		User.find({ where: { ID } })
		.then(user => done(null, user))
		.catch(err => done(err));
	});

	local(passport);
};