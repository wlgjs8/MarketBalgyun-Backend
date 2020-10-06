const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoose_csv = require('mongoose-csv');
const moment = require('moment');

const saleLogSchema = new Schema({
	time: {
		type: Date,
		default: () => {
			return moment().add(9, 'hours').format("YYYY-MM-DD HH:mm:ss");
		},
	},
	first_category: {
		type: String,
		required: true,
	},
	second_category: {
		type: String,
		default: ""
	},
	third_category: {
		type: String,
		default: ""
	},
	productName: {
		type: String,
		default: ""
	},
	quantity: {
		type: Number,
		default: 1,
	},
	// 단일상품 원가
	single_price: {
		type: Number,
	},
	// 단일상품 할인가
	single_discount: {
		type: Number,
		default: 0,
	},
	card: {
		type: Number,
	},
	cash: {
		type: Number,
	},
	point: {
		type: Number,
	},
	total: {
		type: Number,
	},
	customer: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
		trim: true,
	},
	staff: {
		type: String,
		trim: true,
	},
	// 위탁자
	consigner: {
		type: String,
		default: ""
	},
	bank: {
		type: String,
		trim: true,
		default: ""
	},
	// 계좌번호
	account: {
		type: String,
		trim: true,
		default: ""
	},
	// 예금주
	account_owner: {
		type: String,
		trim: true,
		default: ""
	},
	trader: {
		type: String,
		default: ""
	},
});

saleLogSchema.plugin(mongoose_csv);

module.exports = mongoose.model("saleLog", saleLogSchema);
