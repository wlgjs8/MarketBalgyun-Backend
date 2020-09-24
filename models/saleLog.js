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
	card: {
		type: Number,
	},
	cash: {
		type: Number,
	},
	point: {
		type: Number,
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
});

saleLogSchema.plugin(mongoose_csv);

module.exports = mongoose.model("saleLog", saleLogSchema);
