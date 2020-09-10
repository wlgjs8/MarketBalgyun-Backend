var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  return res.json(users);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ err: "Incorrect id" });
  }

  let user = users.filter((user) => user.id == id)[0];
  if (!user) {
    return res.status(404).json({ err: "Unknown user" });
  }
  return res.json(user);
});

let users = [
  {
    id: 1,
    name: "Hyun",
  },
  {
    id: 2,
    name: "Alice",
  },
  {
    id: 3,
    name: "Kelly",
  },
];

module.exports = router;

/*
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
