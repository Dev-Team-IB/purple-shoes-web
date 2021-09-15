var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: '퍼플슈즈' });
});

router.get('/test', function(req, res, next) {
  res.status(200).send({message : "Hello World Express!"});
});

module.exports = router;
