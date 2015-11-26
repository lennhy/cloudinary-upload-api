var express = require('express'),
	imagesSchema = require('../schemas/imagesSchema'),
	bodyParser = require('body-parser'),
	router = express.Router();



router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res) {
	imagesSchema.find(function (err, imageDoc) {
		if(err) {
			res.json({status: false, message: "WOOPS there was an error"});
		}
		else {
	        res.json(imageDoc);
		}
	});
});
module.exports = router;