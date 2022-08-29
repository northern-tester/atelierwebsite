var express = require('express');
var router = express.Router();
var Slack = require('slack-node');
var GoogleRecaptcha = require('google-recaptcha');
var dotenv = require('dotenv');

dotenv.config()

/* GET CfP page. */
router.get('/', function(req, res) {
  res.render('callforpapers', { title: 'Leeds Testing Atelier - Call for Papers' , recaptchaPubKey: process.env.RECAPTCHA_PUBLIC});
});

/* Post a new idea via Slack */
router.post('/', function(req, res) {
			//recaptcha checking
			var googleRecaptcha = new GoogleRecaptcha({secret: process.env.RECAPTCHA_SECRET});
			var recaptchaResponse = req.body['g-recaptcha-response'];
			
			googleRecaptcha.verify({response: recaptchaResponse}, (error) => {
				if (error) {
					return res.render('robot');
				}
					//New slack object
					slack = new Slack();
					slack.setWebhook(process.env.SLACK_WEB_HOOK);
					//Build up the message and post
					slack.webhook({
						channel: process.env.SLACK_CHANNEL,
						username: process.env.SLACK_USERNAME,
						text: "Name: "+req.body.name+"\n\nEmail: "+req.body.email+"\n\nBio: "+req.body.bio+"\n\nTitle: "+req.body.title+"\n\nAbstract: "+req.body.abstract+"\n\nTwitter: "+req.body.twitter
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