var express = require('express'),
	imagesSchema = require('../schemas/imagesSchema'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	cloudinary = require('cloudinary'),
	fs = require('fs'),
	router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

cloudinary.config({
	cloud_name: 'marketdoc',
	api_key: '415993784361253',
	api_secret: 'nx8KojBNL8MQVFv8FCFarNEEy_c'
});


router.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) {
		return filename.replace(/%20/g, "_")+Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
		done=true;
	}
}).single('upload'));


/* GET home page. */
router.post('/:projectName', function(req, res) {
	var projectName = req.params.projectName;

	var postFiles = req.files;
	var logFilePath = postFiles.post_photo.path;
	var cloudaryPublicId = "sdb_"+Date.now();
	var imageURL = cloudaryPublicId +"."+ postFiles.post_photo.extension;

	cloudinary.uploader.upload(logFilePath, function(result) {
		console.log(postFiles.post_photo.extension);
	}, { public_id: cloudaryPublicId});



	var imageModel = new addressesSchema();

	imageModel.projectName = projectName;
	imageModel.imageURL = imageURL;
	imageModel.cloudaryPublicId = cloudaryPublicId;

	var addressId = imageModel.save(function (err, addressDoc) {
	    if (err) return console.error(err);
	    imageModel.imagesSchema();
	});


});

module.exports = router;
