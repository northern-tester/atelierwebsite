var express = require('express');
var router = express.Router();
var speakerData = require('../data/speaker_details.json');
var dotenv = require('dotenv');

/* GET home page. */
router.get('/', function(req, res, next) {
    dotenv.config();
	switch(process.env.ATELIER_STATE) {
    case 'cfp':
        res.render('cfpAtelierIndex', speakerData);
        break;
    case 'pre':
        res.render('preAtelierIndex', speakerData);
        break;
    case 'post':
        res.render('postAtelierIndex', speakerData);
        break;
    case 'no':
        res.render('noAtelierIndex');
        break;
    default:
        res.render('error');
	}
 });

module.exports = router;