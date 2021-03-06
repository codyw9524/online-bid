var mongoose = require('mongoose');

var Users = require('./../controllers/users');
var Bids = require('./../controllers/bids');
var Results = require('./../controllers/results');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.get('/users/:id', Users.show);
	app.post('/sessions', Users.login);
	app.get('/bids', Bids.index);
	app.post('/bids', Bids.create);
	app.delete('/bids', Bids.destroy);
	app.put('/bids', Bids.update);
	app.post('/results', Results.create);
	app.delete('/results', Results.destroy);
	app.get('/results', Results.index);
};
