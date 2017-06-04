var express = require('express');
var router = express.Router();
var speakerData = require('../data/speaker_details.json');
var featureToggles = require('../config/feature-toggles.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	switch(featureToggles.atelierState) {
    case 'pre':
        res.render('preAtelierIndex', speakerData);
        break;
    case 'post':
        res.render('postAtelierIndex', speakerData);
        break;
    default:
        res.render('error');
	}
 });

module.exports = router;