var express = require('express');
var router = express.Router();
const { User } = require("../models/user");
const { ChatRoom } = require("../models/chatRoom");
const { auth } = require("../middleware/encryptAuth");

router.get('/', function(req, res, next) {
    res.status(200).send("Chatting");
});

router.get('/getChatRoom', auth, (req, res) => {
    
    ChatRoom.findOne(
        { userID: req.user._id },
        function (error, success) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(200).send(success);
        }
    });

});

router.post('/makeChatRoom', auth, (req, res) => {
    ChatRoom({ userID : req.user._id })
    .save(function (err) {
        if (err) return res.status(400).send({success : false, msg : "Duplicate", err});
        return res.status(200).send({success : true, message : "ChatRoom created"});
    });
});

router.put('/updateUser', auth, (req, res) => { // 채팅에서 auth는 chatRoom을 찾는 용도로 쓰임

    User.findByToken(req.body.updateUserToken)
    .then((updateUser) => {

        if (!updateUser)
            return res.status(400).json({ isAuth: false,message : "Cannot find such user", error: true});

        const newUser = {
            visitID : updateUser._id,
            lastVisit : (new Date().toISOString()),
        };

        ChatRoom.updateOne(
            { userID: req.user._id },
            { $set: { userLastVisit: newUser } },
            function (error, success) {
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(200).send(success);
                }
            }
        );
        
    })
    .catch((err) => {
      return res.status(400).json({ isAuth: false, error: err});
    });

});

router.put('/sendMessage', auth, (req, res) => {

    User.findByToken(req.body.sendUserToken)
    .then((sendUser) => {

        if (!sendUser)
            return res.status(400).json({ isAuth: false,message : "Cannot find sender", error: true});

        const newMsg = {
            userName : sendUser.name,
            userRole : sendUser.role,
            content : req.body.content,
            isImage : req.body.isImage,
    
            imageInfo: {
                data : req.body.imgData,
                contentType : req.body.imgType,
            },
            
            sendDate : (new Date().toISOString()),
        };

        query = { userID : req.user._id },
        update = {
            $set : { lastChat: newMsg.sendDate },
            $push : { messages: newMsg }
        };
        options = {upsert: false};

        ChatRoom.findOneAndUpdate(query, update, options, function (error, success) {
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(200).send(success);
                }
            }
        );
        
    })
    .catch((err) => {
      return res.status(400).json({ isAuth: false, error: err});
    });

});

module.exports = router;