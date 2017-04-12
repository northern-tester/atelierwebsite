var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var emailConfig = require('../config/email_example.json');
var Slack = require('slack-node');

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Testing Atelier - Call for Papers' });
});

/* Create a Node Mailer Transporter Object */
var transporter = nodemailer.createTransport({
        service: emailConfig.service,
        auth: {
            user: emailConfig.username,
            pass: emailConfig.password
        }
    });

/* Post a new idea via Slack */
router.post('/', function(req, res, next) {
			//Config
			webhookUri = "https://hooks.slack.com/services/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";
			//New slack object
			slack = new Slack();
			slack.setWebhook(webhookUri);
			//Build up the message and post
			slack.webhook({
		  		channel: "#callforpapers",
		 		username: "Call for Papers",
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