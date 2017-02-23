var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var emailConfig = require('../config/email');

/* GET CfP page. */
router.get('/', function(req, res, next) {
  res.render('callforpapers', { title: 'Leeds Testing Atelier - Call for Papers' });
});

/* Create a Node Mailer Transporter Object */
var transporter = nodemailer.createTransport({
        service: emailConfig.service,
        auth: {
            user: emailConfig.username,
            pass: emailConfig.password
        }
    });


/* Post a new idea */
router.post('/', function(req, res, next) {
	var mailOptions = {
		from: req.body.email,
		to: emailConfig.receivers,
		subject: req.body.name + " - " + req.body.title,
		text: req.body.abstract + "\n" + req.body.bio
	};
    console.log(req.body.email);
    console.log(emailConfig.service);
    res.render('thankyou');
    transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    } else {
	        console.log('Message sent: ' + info.response);
	    }
	});
});

module.exports = router;