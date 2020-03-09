var express = require('express');
var router = express.Router();
var Slack = require('slack-node');
var GoogleRecaptcha = require('google-recaptcha');

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Leeds Testing Atelier - Call for Papers' , recaptchaPubKey: process.env.recaptchaConfigPublic});
});

/* Post a new idea via Slack */
router.post('/', function(req, res, next) {
			//recaptcha checking
			var googleRecaptcha = new GoogleRecaptcha({secret: process.env.recaptchaConfigSecret});
			var recaptchaResponse = req.body['g-recaptcha-response'];
			
			googleRecaptcha.verify({response: recaptchaResponse}, (error) => {
				if (error) {
					return res.render('robot');
				}
					//Config
					var webhookUri = process.env.slackConfigWebHookUri;
					//New slack object
					slack = new Slack();
					slack.setWebhook(webhookUri);
					//Build up the message and post
					slack.webhook({
						channel: process.env.slackConfigChannel,
						username: process.env.slackConfigUsername,
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