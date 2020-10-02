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
		default: price,
		required: true,
	},
	quantity: {
		type: Number,
		default: 1,
		required: true,
	},
	story: {
		type: String,
		default: "",
		required: true,
	},
	max_discount: {
		type: Number,
		default: 0,
		required: true,
	},
	place: {
		type: String,
		trim: true,
		default: "",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	consigner: {
		type: String,
		trim: true,
		required: true,
	},
	phone: {
		type: String,
		trim: true,
		required: true,
	},
	accountable: {
		type: Boolean,
		default: false,
		required: true,
	},
	// 거래은행
	bank: {
		type: String,
		trim: true,
		default: "",
		required: true,
	},
	// 계좌번호
	account: {
		type: String,
		trim: true,
		default: "",
		required: true,
	},
	// 예금주
	account_owner: {
		type: String,
		trim: true,
		default: "",
		required: true,
	},
});

ConsignProductSchema.virtual('expire_date').get(function () {
	return moment().add(90, 'days').calendar().format('LL');
})

module.exports = mongoose.model('ConsignProduct', ConsignProductSchema);