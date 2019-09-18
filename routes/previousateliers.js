var express = require('express');
var router = express.Router();
var previousAtelierData = require('../data/previous_ateliers.json');


/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('previousateliers', previousAtelierData);
});

/* Give us feedback on previous events */
router.post('/', function(req, res, next) {
    console.log(req.body.feedback);
    res.send('Thanks for your feedback!');
});

module.exports = router;