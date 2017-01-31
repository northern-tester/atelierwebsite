var express = require('express');
var router = express.Router();

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Leeds Testing Atelier - Call for Papers' });
});

/* Post a new idea */
router.post('/', function(req, res, next) {
    console.log(req.body.email);
    res.send('Post page');
});

module.exports = router;