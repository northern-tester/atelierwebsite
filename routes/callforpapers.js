var express = require('express');
var router = express.Router();

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Leeds Testing Atelier - Call for Papers' });
});

module.exports = router;