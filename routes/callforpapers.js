const express = require('express');
const router = express.Router();
const slackConfig = require('../config/slack.json');
const recaptchaConfig = require('../config/recaptcha.json');
const Slack = require('slack-node');
const GoogleRecaptcha = require('google-recaptcha');
const dataAccess = require('../dataAccess/dataAccess');

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
					const talkDocument = {
						name: req.body.name,
						email: req.body.email,
						bio: req.body.bio,
						talkTitle: req.body.title,
						abstract: req.body.abstract,
						twitter: req.body.twitter
					}
					dataAccess.addTalk(talkDocument);
					//Build up the message and post
					slack.webhook({
						channel: slackConfig.channel,
						username: slackConfig.username,
						text: `Name: ${talkDocument.name}"\n\nEmail: ${talkDocument.email}\n\nBio: ${talkDocument.bio}\n\nTitle: ${talkDocument.title}\n\nAbstract: ${talkDocument.abstract}\n\nTwitter: ${talkDocument.twitter}`
					}, function(err) {
						if(err) {
							console.log(err.message);
							return;
						}
						return res.render('thankyou');
					});
			});
});

module.exports = router;