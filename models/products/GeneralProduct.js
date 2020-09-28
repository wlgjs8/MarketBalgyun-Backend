const mongoose = require("mongoose");
const { Schema } = mongoose;

const GeneralProductSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  first_category: {
    type: String,
    required: true,
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
    String: String,
  },
  // 원가
  cost: {
    type: Number,
  },
  // 판매가
  price: {
    type: Number,
    required: true,
  },
  trader: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  max_discount: {
    type: Number,
    dafault: 50,
  },
  place: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GeneralProduct", GeneralProductSchema);
