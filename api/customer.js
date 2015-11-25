var express = require('express'),
	usersSchema = require('../schemas/usersSchema'),
	bodyParser = require('body-parser'),
	router = express.Router(),
	jwt = require("jsonwebtoken");
router.use(bodyParser.urlencoded({ extended: false }));


router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.headers['x-access-token'];
	console.log("TOKEN:", token);

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'superSecret', function(err, decoded) {
			if (err) {
				console.log(err);
				return res.json({ status: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				console.log("Decoded:", decoded);
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			status: false,
			message: 'No token provided.'
		});

	}
});

router.get('/', function(req, res) {

	// var accessToken = req.headers['x-access-token'],

	usersSchema.findOne({"_id": req.decoded},function (err, customer) {
        if (err) return console.error(err);

        var userModel = new usersSchema;
        userModel.toJSON(); // removes all the stuff we dont want ppl to see
        res.json(customer);
	});
});



module.exports = router;
