var express = require('express');
var router = express.Router();
var sponsorData = require('../data/sponsor_details.json');


/* GET sponsors page. */
router.get('/', function(req, res, next) {
    res.render('sponsors', sponsorData);
});

module.exports = router;