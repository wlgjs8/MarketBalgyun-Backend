const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../model');

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField:'ID',
		passwordField:'password',
	}, async (ID, password, done) => {
		try{
			const exUser = await User.find({ where: { ID } });
			if (exUser) {
				const reuslt = await bcrypt.compare(password, exUser.password);
				if (result) {
					done(null, exUser);
				}
				else {
					done(null, false, { message:'비밀번호가 일치하지 않습니다. '});
				}
			}
			else {
				done(null, false, { message:'가입되지 않은 회원입니다.'});
			}
		} catch (error) {
			console.error(error);
			done(error);
		}
	}));
};