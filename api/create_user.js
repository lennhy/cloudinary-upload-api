var express = require('express'),
	usersSchema = require('../schemas/usersSchema'),
	bodyParser = require('body-parser'),
	router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));


router.post('/', function(req, res) {

    var firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email.toLowerCase(),
        password = req.body.password,
        admin = req.body.isAdmin;
     


    var fullName = firstName+' '+lastName;
    console.log("THE FULL NAME: ", fullName);

	usersSchema.findOne({'local.email': req.body.email}, function(err, user) {
        if (err) {
            res.json({type: false, data: "Error occured: " + err });
        } else if (user) {
            res.json({type: false, data: "User with that email already exists!" });
      	} else {
            var userModel = new usersSchema();

            userModel.local.email = email;
            userModel.local.password = userModel.generateHash(password);
            userModel.local.userFirstName = firstName;
            userModel.local.userLastName  = lastName;
            userModel.admin = true;
            

            userModel.save(function (err, userDoc) {
                if (err) return console.error(err);
                
                var userReturn = userModel.toJSON();
            });
               
        }
    });
});

module.exports = router;
