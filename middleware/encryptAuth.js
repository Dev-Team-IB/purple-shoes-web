const { User } = require("../models/user");

let auth = (req, res, next) => {
  let token = req.body.userToken

  User.findByToken(token)
    .then((user) => {
        
      if (!user)
        return res.status(400).json({ isAuth: false,message : "Cannot find such user", error: true});

      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({ isAuth: false, error: err});
    });
};

module.exports = { auth };

/*
{
	"email" : "judemin@naver.com",
	"password" : "1234567"
}
*/