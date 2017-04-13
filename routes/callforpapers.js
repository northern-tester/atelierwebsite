var express = require('express');
var router = express.Router();
var slackConfig = require('../config/slack.json');
var Slack = require('slack-node');

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Testing Atelier - Call for Papers' });
});

/* Post a new idea via Slack */
router.post('/', function(req, res, next) {
			//Config
			webhookUri = slackConfig.webhookuri;
			//New slack object
			slack = new Slack();
			slack.setWebhook(webhookUri);
			//Build up the message and post
			slack.webhook({
		  		channel: slackConfig.channel,
		 		username: slackConfig.username,
		  		text: "Name: "+req.body.name+"\n\nEmail: "+req.body.email+"\n\nBio: "+req.body.bio+"\n\nTitle: "+req.body.title+"\n\nAbstract: "+req.body.abstract+"\n\nTwitter: "+req.body.twitter
			}, function(err, response) {
				if(err) {
					res.render('error');
					return;
				}
				res.render('thankyou');
		});
	});

module.exports = router;