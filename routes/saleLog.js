var express = require("express");
var router = express.Router();
const User = require("../models/User");


router.get("/", async (req, res) => {
    try {
        const userName = req.query.name;
        const userTemp = await User.find({
            name: userName,
        });
        if (userTemp.length != 0) {
            userJson = JSON.stringify(userTemp);
            res.send(userJson);
        } else {
            res.send("No User");
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.post("/", async (req, res) => {
    var saledProduct = req.body.ID;
})

module.exports = router;
