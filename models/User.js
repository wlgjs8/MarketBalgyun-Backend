const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
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
		required: true,
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'name' });

module.exports = mongoose.model('User', userSchema);