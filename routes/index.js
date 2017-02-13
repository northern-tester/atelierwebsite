var express = require('express');
var router = express.Router();
var speakerData = require('../data/speaker_details.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', speakerData);
 });

module.exports = router;