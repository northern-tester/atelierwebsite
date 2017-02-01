var express = require('express');
var router = express.Router();

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('previousateliers', { title: 'Previous Testing Ateliers' });
});

/* Give us feedback on previous events */
router.post('/', function(req, res, next) {
    console.log(req.body.feedback);
    res.send('Thanks for your feedback!');
});

module.exports = router;