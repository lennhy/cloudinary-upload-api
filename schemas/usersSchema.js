var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId,
    bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var usersSchema = mongoose.Schema({

    __v: {type: Number, select: false},
    admin: { type: Boolean, default: true },
    stripeId: String,
    local: {
        userFirstName: String,
        userLastName: String,
        email: String,
        phone: Number,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    dateCreated: {type: Date, default: Date.now}

});

// methods ======================
// generating a hash
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function(password) {
    console.log(this.local.password);
    console.log(password);
    return bcrypt.compareSync(password, this.local.password);
};

usersSchema.methods.toJSON = function() {
    var obj = this.toObject();

    if(obj.local) {
        // console.log("obj::: ", obj);
        delete obj.local.password;
        // delete obj.__v;
        return obj;
    }
}


// create the model for users and expose it to our app
module.exports = mongoose.model('SdbUser', usersSchema); // AKA Peter lol