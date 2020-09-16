const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField:'ID',
		passwordField:'password',
		//passReqToCallback:true,
	}, async (ID, password, done) => {
		try{
			const exUser = await User.findOne({ ID:ID });
			if (exUser) {
				const result = await bcrypt.compare(password, exUser.password);
				if (result) {
					console.log('login clear')
					done(null, exUser);
				}
				else {
					done(null, false, { message:'비밀번호가 일치하지 않습니다.' });
					console.log('비밀번호가 일치하지 않습니다.')
				}
			}
			else {
				done(null, false, { message:'가입되지 않은 회원입니다.' });
				console.log('가입되지 않은 회원입니다.')
			}
		} catch (error) {
			console.error(error);
			//done(error);
		}
	}));
};