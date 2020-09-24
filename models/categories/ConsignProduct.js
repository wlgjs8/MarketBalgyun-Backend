const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

var ConsignProductSchema = new Schema({
	id:{
		type:String,	//int형인가 String인가
		required:true,
		trim:true,
	},
	name:{
		type:String,
		required:true,
	},
	price:{
		type:Number,
	},
	wanted_price:{
		type:Number,
	},
	name:{
		String:String,
	},
	cost:{
		type:Number,
		required:true,
	},
	price:{
		type:Number,
	},
	quantity:{
		type:Number,
	},
	story:{
		type:String,
	},
	max_discount:{
		type:Number,
	},
	place:{
		type:String,
		trim:true,
	},
	date:{
		type:Date,
		default: Date.now,
	},
});

ConsignProductSchema.virtual('expire_date').get(function(){
	return moment().add(90, 'days').calendar().format('LL');
})

module.exports = mongoose.model('ConsignProduct', ConsignProductSchema);