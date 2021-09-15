var express = require('express');
var router = express.Router();

const RestClient = require('@bootpay/server-rest-client').RestClient;
RestClient.setConfig(
    process.env.APPLICATION_ID,
    process.env.PRIVATE_KEY
);

router.get('/', function(req, res, next) {
    res.status(200).send("Bootpay API");
});

router.get('/lookup', function(req, res, next) {

    let receipt_id = req.body.receipt_id

    RestClient.getAccessToken().then(function (response) {
        // Access Token을 발급 받았을 때
        if (response.status === 200 && response.data.token !== undefined) {
            RestClient.verify(receipt_id).then(function (_response) {
                // 검증 결과를 제대로 가져왔을 때
                if (_response.status === 200) {
                    res.status(200).send(_response);
                } else{
                    res.status(400).send("Failed to get receipt info");
                }
            }).catch(
                function (error){
                    res.status(400).send(error);
                    console.log(error);
                }
            );
        }  else{
            res.status(400).send("Failed to get BP Token");
        }
    });
});

router.get('/cancel', function(req, res, next) {

    let receipt_id = req.body.receipt_id;
    let cancel_price = req.body.cancel_price; // 부분취소 가능
    let canel_name = req.body.canel_name;
    let canel_reason = req.body.canel_reason;

    RestClient.getAccessToken().then(function (response) {
        // Access Token을 발급 받았을 때
        if (response.status === 200 && response.data.token !== undefined) {
            RestClient.cancel({
                receiptId: receipt_id,
                price: cancel_price,
                name: canel_name,
                reason: canel_reason
            }).then(function (response) {
                // 결제 취소가 완료되었다면
                if (response.status === 200) {
                    res.status(200).send(response);
                }
            }).catch(
                function (error){
                    res.status(400).send(error);
                    console.log(error);
                }
            );
        }  else{
            res.status(400).send("Failed to get BP Token");
        }
    });
});

module.exports = router;


// 612b657c0199430036b50f7d
// 612b65530d681b0039e5fad1