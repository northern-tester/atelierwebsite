var express = require('express');
var router = express.Router();

/* GET Thank You Page. */
router.get('/', function(req, res, next) {
  res.render('thankyou');
});

module.exports = router;
