var express = require("express");
var router = express.Router();
// const User = require("../models/Customers");

router.use(express.json());

router.get("/", async (req, res) => {
  req.query.postPhone = "01021492222";
  const postPhone = req.query.postPhone;

  // const userTemp = await Customers.find({ phone: postPhone });

  userJson = JSON.stringify(Customers);
  res.send(userJson);
});

router.post("/", async (req, res) => {
  //Write schema from req.body
  console.log("HELLO POST");
});

let Customers = [
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
