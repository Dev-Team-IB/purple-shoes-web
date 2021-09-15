var express = require('express');
var router = express.Router();
const { User } = require("../models/user");
const { auth } = require("../middleware/encryptAuth");

router.get("/", auth, (req, res) => {

  res.status(200).json({
    _id: req._id,
    isAdmin: req.user.role === 09 ? true : false,
    isTailer: req.user.role === 08 ? true : false,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
    birthDate: req.user.birthDate,
    totPayment: req.user.totPayment,
  });

});

router.get('/login', function(req, res, next) {
  //로그인시 아이디와 비밀번호 json으로 넘겨줌
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.json({
        loginSuccess: false,
        message: "Invalid Email",
      });
    }

    if(user){
      user
        .comparePassword(req.body.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: "Invalid Password",
            });
          }
          //비밀번호 일치했을 때 토큰 생성
          user
            .generateToken() //jwt 토큰 생성
            .then((user) => {
              res
                // .cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userToken : user.token }); // userId: user._id
            })
            .catch((err) => {
              res.status(400).send({loginSuccess: false, err});
            });
        })
        .catch((err) => res.json({ loginSuccess: false, err }));
    }else {
      res.status(400).send({loginSuccess: false, message: "No Such User"});
    }
  });
});

router.post('/register', function(req, res, next) {
  //post로 넘어온 데이터를 받아서 DB에 저장
  //user 모델에서 mongoose에 연결 => 바로 데이터베이스에 저장
  const user = new User(req.body);
  // req의 body는 User schema를 json화 시킨 구조

  user.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;