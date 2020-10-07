const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment');

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
    unique: true,
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
  // 가입날짜
  date: {
    type: Date,
    default: () => {
      return moment().add(9, 'hours').format("YYYY-MM-DD HH:mm:ss");
    },
  },
  boolConsign: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Customer", CustomerSchema);
