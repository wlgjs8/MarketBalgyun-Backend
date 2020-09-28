const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField:'name',
		passwordField:'password',
		session:true,
		passReqToCallback:true,
	}, async (req, name, password, done) => {
		try{
			const exUser = await User.findOne({ name:name });
			if (exUser) {
				const result = await bcrypt.compare(password, exUser.password);
				if (result) {
					console.log('sign in clear');
					done(null, exUser);
				}
				else {
					done(null, false, { message:'비밀번호가 일치하지 않습니다.' });
					console.log('비밀번호가 일치하지 않습니다.');
				}
			}
			else {
				done(null, false, { message:'가입되지 않은 회원입니다.' });
				console.log('가입되지 않은 회원입니다.');
			}
		} catch (error) {
			console.error(error);
			//done(error);
		}
	}));
};
