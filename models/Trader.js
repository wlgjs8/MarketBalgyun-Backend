const mongoose = require("mongoose");
const { Schema } = mongoose;

const TraderSchema = new Schema({
  // 거래처명
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // 사업자 번호
  trader_number: {
    type: String,
    trim: true,
  },
  CEO: {
    type: String,
    trim: true,
  },
  //업태
  business: {
    type: String,
    required: true,
  },
  // 종목
  business_item: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  // 휴대전화
  mobile_phone: {
    type: String,
    trim: true,
  },
  // 메일
  email: {
    type: String,
    trim: true,
  },
  // 거래처 홈피
  site: {
    type: String,
    trim: true,
  },
  // 우편번호
  post: {
    type: String,
    trim: true,
  },
  // 주소
  address: {
    type: String,
    trim: true,
  },
  // 관리사원
  staff: {
    type: String,
    trim: true,
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
  // 수수료
  fee: {
    type: Number,
    trim: true,
  }
});

module.exports = mongoose.model("Trader", TraderSchema);
