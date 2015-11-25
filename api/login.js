var express = require('express'),
	usersSchema = require('../schemas/usersSchema'),
	bodyParser = require('body-parser'),
	router = express.Router(),
	jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/:login_type', function(req, res) { //login types:local, social

	var login_type = req.params.login_type;

	if(login_type == 'local') {

		var email = req.body.email;
		var password = req.body.password;
		console.log("email", email);
		console.log("password", password);
		// find the user
		usersSchema.findOne({
			'local.email': email
		}, function(err, user) {
			console.log("I found a user", user);
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
				console.log("Password", user.validPassword(password));
				// check if password matches
				if (!user.validPassword(password)) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					// ALL GOOD

					// if user is found and password is right
			        // create a token
			        console.log("User", user.id);
			        var accessToken = jwt.sign(user.id, 'superSecret', {expiresIn: 2592000}); //Expires in 30 days from creation date


					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: accessToken
					});
				}

			}

		});
	}
	else if(login_type == 'admin') {
		var email = req.body.email;
		var password = req.body.password;
		console.log("email", email);
		console.log("password", password);
		// find the user
		usersSchema.findOne({
			'local.email': email
		}, function(err, user) {
			console.log("I found a user", user);
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
				console.log("Password", user.validPassword(password));
				// check if password matches
				if (!user.validPassword(password)) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					// ALL GOOD

					// if user is found and password is right
			        // create a token
			        console.log("User", user.id);
			        var accessToken = jwt.sign(user.id, 'superSecret', {expiresIn: 2592000}); //Expires in 30 days from creation date


					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: accessToken
					});
				}

			}

		});
	}
	else if(login_type == 'social') {
		res.json({
			success: true,
			message: 'I am social',
			body: req.body
		});
	}

});






module.exports = router;
