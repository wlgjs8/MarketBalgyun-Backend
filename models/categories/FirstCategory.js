const mongoose = require('mongoose');
const { Schema } = mongoose;

const FirstCategorySchema = new Schema({
	FirstCategory:{
		type:String,
		required:true,
		trim:true,
	},
	ID:{
		type:Number,
		required:true,
	}
	

});

module.exports = mongoose.model('FirstCategory', FirstCategorySchema);