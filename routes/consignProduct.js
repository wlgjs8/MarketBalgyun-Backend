var express = require("express");
var router = express.Router();
const ConsignProduct = require("../models/products/ConsignProduct");

router.get("/", async (req, res) => {
    try {
        const searchID = req.query.id;
        const consigneProductTemp = await ConsignProduct.find({
            id: searchID,
        });
        if (consigneProductTemp.length != 0) {
            consigneProductJson = JSON.stringify(consigneProductTemp);
            res.send(consigneProductJson);
        } else {
            res.send("No Consign Product");
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.post("/", async (req, res) => {
    // var tempID = "A" + ID.toString();
    try {
        ConsignProduct.insertMany([req.body]);
        res.send("Posting Success");
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;
