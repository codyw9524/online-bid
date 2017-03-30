myApp.factory('BidFactory', function($http){
	var factory = {};

	factory.index = function(callback){
		$http.get('/bids').then(callback);
	}

	factory.create = function(callback){
		$http.post('/bids').then(callback);
	}

	factory.bid = function(bidObj, callback){
		$http.put('/bids', bidObj).then(callback);
	}

	return factory;
})