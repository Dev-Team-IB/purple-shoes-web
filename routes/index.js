var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: '퍼플슈즈' });
});

module.exports = router;
