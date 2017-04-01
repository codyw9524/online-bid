myApp.factory('ResultFactory', function($http){
	var factory = {};

	factory.index = function(callback){
		$http.get('/results').then(callback);
	}

	factory.create = function(callback){
		$http.post('/results').then(callback);
	}

	factory.destroy = function(callback){
		$http.delete('/results').then(callback);
	}

	return factory;
})