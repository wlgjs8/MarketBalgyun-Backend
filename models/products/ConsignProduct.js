const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

var ConsignProductSchema = new Schema({
	id: {
		type: String,
		required: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
	},
	// 감정가, 판매가
	price: {
		type: Number,
		required: true,
	},
	// 희망가
	wanted_price: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
	story: {
		type: String,
	},
	max_discount: {
		type: Number,
	},
	place: {
		type: String,
		trim: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	consigner: {
		type: String,
		trim: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	accountable: {
		type: Boolean,
	}
});

ConsignProductSchema.virtual('expire_date').get(function () {
	return moment().add(90, 'days').calendar().format('LL');
})

module.exports = mongoose.model('ConsignProduct', ConsignProductSchema);