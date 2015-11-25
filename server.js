var db = require('./db'),
	app = require('./app')();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
  db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('connection to DB successfull');
        console.log(app.get('env'));
    });
});
