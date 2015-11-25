module.exports = function() {

    var express = require('express');
    var path = require('path');

    // Storing the paths for routes
    var api = require('./api/index');
    var register = require('./api/create_user');
    var login = require('./api/login');
    var customer = require('./api/customer');
    var upload = require('./api/upload');
    

    // Defining the App
    var app = express();
    
    // Required in the app.js file to post JSON
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    // Make sure the favicon file is saved in as /public/images/favicon.ico
    var favicon = require('serve-favicon');
    app.use(favicon(path.join(__dirname,'/public','images','favicon.ico')));

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, x-access-token");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        if ('OPTIONS' === req.method) {
            res.status(204).send();
        }
        else {
            next();
        }
    });

    // Handling Routes
    app.use('/', api);
    app.use('/register', register);
    app.use('/login', login);
    app.use('/customer', customer);
    app.use('/upload', upload);


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        // var err = new Error(':( Not Found');
        res.status = 404;
        res.send({ url: req.url, error: 'Page Not Found' });
        next();
    });

    return app;
}