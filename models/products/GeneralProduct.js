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
  cost: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  trader: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
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
});

module.exports = mongoose.model("GeneralProduct", GeneralProductSchema);