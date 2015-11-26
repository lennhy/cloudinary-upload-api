var express = require('express'),
	imagesSchema = require('../schemas/imagesSchema'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	cloudinary = require('cloudinary'),
	fs = require('fs'),
	router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

cloudinary.config({
	cloud_name: 'dhthj8qmy',
	api_key: '534567889186334',
	api_secret: 'Ui9XrHTVo8ZcBGmpPYLaEVr_ka4'
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

	console.log(req);

	var postFiles = req.file;
	var logFilePath = postFiles.path;
	var cloudaryPublicId = "sdb_"+Date.now();
	var imageURL = cloudaryPublicId +"."+ postFiles.originalname;

	cloudinary.uploader.upload(logFilePath, function(result) {
		console.log(postFiles);
	}, { public_id: cloudaryPublicId});



	var imageModel = new imagesSchema();

	imageModel.projectName = projectName;
	imageModel.imageURL = imageURL;
	imageModel.cloudaryPublicId = cloudaryPublicId;

	var addressId = imageModel.save(function (err, addressDoc) {
	    if (err) return console.error(err);
	    // imageModel.imagesSchema();
	});

	res.json({
		"projectName": projectName,
		"imageURL": imageURL,
		"cloudaryPublicId": cloudaryPublicId
	});
});

module.exports = router;
