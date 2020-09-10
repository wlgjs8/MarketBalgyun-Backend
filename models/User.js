const mongoose = require('mongoose');
// const User = require('../models/User');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
//const passport = require('passport');

const userSchema = new Schema({
	ID:{
		type:String,
		required:true,
		unique:true,
		trim:true,
	},
	password:{
		type:String,
		required:true,
		trim:true,
	},
	name:{
		type:String,
		required:true,
		trim:true,
	},
	level:{
		type:String,
		requried:true,
	}
});

userSchema.plugin(passportLocalMongoose, {usernameField:'ID'});

module.exports = mongoose.model('User', userSchema);