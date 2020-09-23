const mongoose = require('mongoose');
// const User = require('../models/User');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
//const passport = require('passport');

const userSchema = new Schema({
<<<<<<< HEAD
	name:{
		type:String,
		required:true,
		trim:true,
	},
	password:{
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
=======
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    requried: true,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "name" });
module.exports = mongoose.model("User", userSchema);
>>>>>>> 4f5a445e126c094c6913b48b4636afc5c14a9e7d
