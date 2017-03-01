var express = require('express');
var router = express.Router();
var speakerData = require('../data/speaker_details.json');

/* GET test page. */
router.get('/', function(req, res, next) {
    res.render('test', speakerData);
});

module.exports = router;