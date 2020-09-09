const mongoose = require('mongoose');

const { Schema } = mongoose;
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
})