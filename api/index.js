var express = require('express'),
	router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	res.json({api: "we are ok"});
});

module.exports = router;
