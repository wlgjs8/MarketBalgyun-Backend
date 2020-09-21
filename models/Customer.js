const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  taste: {
    type: String,
    trim: true,
  },
  boolSMS: {
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

module.exports = mongoose.model("Customer", CustomerSchema);
