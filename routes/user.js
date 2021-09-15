var express = require('express');
var router = express.Router();
const { User } = require("../models/user");
const { auth } = require("../middleware/encryptAuth");

router.get('/', function(req, res, next) {
    res.status(200).send("User data modification");
});

router.put('/putPayment', auth, (req, res) => {

    const objPayment = {
        receiptID : req.body.receiptID,
        shipStat : req.body.shipStat,
        tailorToken : req.body.tailorToken
    };

    User.updateOne(
        { _id: req.user._id }, 
        { $push: { payments: objPayment } },
        function (error, success) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(200).send(success);
            }
        }
    );
});

router.delete('/deletePayment', auth, (req, res) => {

    const objPayment = {
        receiptID : req.body.receiptID
    };

    User.updateOne(
        { _id: req.user._id }, 
        { $pull: { payments: objPayment } },
        function (error, success) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(200).send(success);
            }
        }
    );
});

module.exports = router;