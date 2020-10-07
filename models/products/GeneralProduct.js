const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment');

// moment.tz.setDefault("Asia/Seoul");
// var KoreanTime = () => {
//   return moment().add(9, 'hours').format('YYYY-MM-DD HH:mm:ss');
// }

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
    type: String,
    default: "",
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
    default: 1,
    required: true,
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
    },
  },
});

module.exports = mongoose.model("GeneralProduct", GeneralProductSchema);
