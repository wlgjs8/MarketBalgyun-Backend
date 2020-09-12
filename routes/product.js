var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  return res.json(GeneralProducts);
});

let GeneralProducts = [
  {
    id: 102132,
    first_category: "유아동",
    second_category: "의류및패션잡화",
    third_category: "상의",
    name: "",
    cost: 0,
    price: 3800,
    quantity: 12,
    place: 1,
    date: "2020-03-26 13:30:00",
  },
  {
    id: 120133,
    first_category: "인테리어",
    second_category: "가구",
    third_category: "장식장",
    name: "고급 앤틱 장식장",
    cost: 1000000,
    price: 799000,
    quantity: 1,
    place: 1,
    date: "2020-03-26 13:30:00",
  },
  {
    id: 130434,
    first_category: "취미",
    second_category: "음반",
    third_category: "CD",
    name: "",
    cost: 100000,
    price: 40000,
    quantity: 1,
    place: 1,
    date: "2020-03-26 13:30:00",
  },
  {
    id: 120871,
    first_category: "인테리어",
    second_category: "가구",
    third_category: "장식장",
    name: "",
    cost: 100000,
    price: 37000,
    quantity: 4,
    place: 1,
    date: "2020-03-26 13:30:00",
  },
  {
    id: 130537,
    first_category: "유아동",
    second_category: "유아동용품(장난감/문구류)",
    third_category: "브랜드",
    name: "순면소녀모자",
    cost: 20000,
    price: 17100,
    quantity: 1,
    place: 1,
    date: "2020-03-26 13:30:00",
  },
];

module.exports = router;
