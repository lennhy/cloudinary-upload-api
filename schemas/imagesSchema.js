var mongoose = require('mongoose');

// define the schema for our user model
var imagesSchema = mongoose.Schema({

    __v: {type: Number, select: false},
    projectName: String,
    imageURL: String,
    cloudaryPublicId: String,
    dateCreated: {type: Date, default: Date.now}

});

imagesSchema.methods.statusMessage = function () {
  var message = this.imageURL
    ? "Image url: " + this.imageURL + " added"
    : "Woops, no Images Detected";
  console.log(message);
}


// create the model for users and expose it to our app
module.exports = mongoose.model('SdbImage', imagesSchema);