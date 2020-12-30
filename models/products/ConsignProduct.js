const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

var ConsignProductSchema = new Schema({
	id: {
		type: String,
		required: true,
		trim: true,
	},
	first_category: {
		type: String,
		trim: true,
	},
	second_category: {
		type: String,
		trim: true,
	},
	third_category: {
		type: String,
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
		default: 1,
		required: true,
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
		default: () => {
			return moment().add(9, 'hours').format("YYYY-MM-DD HH:mm:ss");
		}
	},
	expire_date: {
		type: Date,
		default: () => {
			return moment().add(9, 'hours').add(90, 'days').format("YYYY-MM-DD HH:mm:ss");
		}
	},
	consigner: {
		type: String,
		required: true,
		trim: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	accountable: {
		type: Boolean,
		default: false,
	},
	// 거래은행
	bank: {
		type: String,
		trim: true,
		default: "",
	},
	// 계좌번호
	account: {
		type: String,
		trim: true,
		default: "",
	},
	// 예금주
	account_owner: {
		type: String,
		trim: true,
		default: "",
	},
});

module.exports = mongoose.model('ConsignProduct', ConsignProductSchema);