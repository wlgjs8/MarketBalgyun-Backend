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
    dafault: true,
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
  time: {
    type: Date,
    default: Date.now,
  },
  // 거래은행
  bank: {
    type: String,
    trim: true,
  },
  // 계좌번호
  account: {
    type: String,
    trim: true,
  },
  // 예금주
  account_owner: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
