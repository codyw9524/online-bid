var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

require('./server/config/mongoose');

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());

require('./server/config/routes')(app)

var server = app.listen(8000, function(){
	console.log('listening on port 8000...');
})

require('./server/config/socket')(server);

