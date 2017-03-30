myApp.factory('UserFactory', function($http, $cookies){
	var factory = {};

	factory.user = {};

	factory.index = function(callback){
		$http.get('/users').then(callback);
	}

	factory.create = function(data, callback){
		$http.post('/users', data).then(function(res){
			if(!res.data.errors){
				$cookies.put('user_id', res.data._id);
			} else {
				factory.user = res.data;
			}
			callback(res);
		})
	}

	factory.login = function(data, callback){
		$http.post('/sessions', data).then(function(res){
			if(!res.data.errors){
				console.log('creating session...')
				$cookies.put('user_id', res.data._id);
				factory.user = res.data;
			}
			callback(res);
		})
	}

	factory.session = function(callback){
		user_id = $cookies.get('user_id')
		if(user_id){
			$http.get('/users/' + user_id).then(function(res){
				factory.user = res.data;
				callback(res);
			})
		} else {
			factory.user = {};
			callback(false);
		}
	}

	return factory;
})