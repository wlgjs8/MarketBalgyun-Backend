const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoose_csv = require('mongoose-csv');

const saleLogSchema = new Schema({
	time: {
		type: Date,
		default: Date.now,
	},
	product: {
		type: String,
		required: true,
	},
	trader: {
		type: String,
	},
	quantity: {
		type: Number,
		default: 1,
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
});

saleLogSchema.plugin(mongoose_csv);

module.exports = mongoose.model("saleLog", saleLogSchema);
