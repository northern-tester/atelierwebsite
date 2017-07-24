var express = require('express');
var router = express.Router();
var slackConfig = require('../config/slack.json');
var recaptchaConfig = require('../config/recaptcha.json');
var Slack = require('slack-node');
var GoogleRecaptcha = require('google-recaptcha');

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Leeds Testing Atelier - Call for Papers' , recaptchaPubKey: recaptchaConfig.public});
});

/* Post a new idea via Slack */
router.post('/', function(req, res, next) {
			//recaptcha checking
			var googleRecaptcha = new GoogleRecaptcha({secret: recaptchaConfig.secret});
			var recaptchaResponse = req.body['g-recaptcha-response'];
			
			googleRecaptcha.verify({response: recaptchaResponse}, (error) => {
				if (error) {
					return res.render('robot');
				}
					//Config
					var webhookUri = slackConfig.webhookuri;
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
							console.log(err.message);
							return;
						}
						return res.render('thankyou');
					});
			});
});

module.exports = router;