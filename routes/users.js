var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.use(express.json());

router.get("/", async (req, res) => {
  // const userTemp = await User.findOne({ ID: "0001" }[0]);
  const userTemp = await User.find({ ID: "0001" });
  userJson = JSON.stringify(userTemp);
  console.log(userJson);

  return res.json(customerDB);
});

router.post("/", (req, res) => {
  req.body.phone = "2222";
  res.send(customerDB);
  // console.log(m)
});

let customerDB = [
  {
    name: "변지현",
    phone: "01021491111",
    taste: "",
    boolSMS: false,
    boolLecture: false,
    likeCategory: "고가구",
    something: "생축",
    email: "bjh@naver.com",
    birthday: "990830",
    gender: "M",
    address: "사가정",
    mainNumber: 1,
    point: 3400,
  },
  {
    name: "손예진",
    phone: "01021492222",
    taste: "",
    boolSMS: false,
    boolLecture: true,
    likeCategory: "브랜드 의류",
    something: "곤듀님은 오늘도 아름답다.",
    email: "",
    birthday: "",
    gender: "F",
    address: "",
    mainNumber: 1,
    point: 2700,
  },
];

module.exports = router;
