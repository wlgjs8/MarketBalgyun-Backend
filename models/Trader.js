const mongoose = require("mongoose");
const { Schema } = mongoose;

const TraderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  trader_number: {
    type: String,
    trim: true,
  },
  CEO: {
    type: String,
    trim: true,
  },
  business: {
    //업태
    type: Boolean,
    required: true,
  },
  boolLecture: {
    type: Boolean,
    required: true,
  },
  likeCategory: {
    type: String,
  },
  something: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  mainNumber: {
    type: Number,
  },
  point: {
    type: Number,
  },
});

module.exports = mongoose.model("Trader", TraderSchema);
