var express = require("express");
var router = express.Router();
const User = require("../models/User");


router.get("/", async (req, res) => {
    // excel
});

router.post("/", async (req, res) => {
    var saledProduct = req.body.ID;
    try {
        const searchID = req.query.id;
        const generalProductTemp = await GeneralProduct.find({
            id: searchID,
        });
        if (generalProductTemp.length != 0) {
            generalProductJson = JSON.stringify(generalProductTemp);
            res.send(generalProductJson);
        } else {
            res.send("No General Product");
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

module.exports = router;
