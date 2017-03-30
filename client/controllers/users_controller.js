myApp.controller('UsersController', function(UserFactory, $cookies, $location){
	console.log('instanciating UsersController')
	
	var self = this;
	self.registrationErrors = [];
	self.loginErrors = [];
	self.user = {};

	UserFactory.session(function(res){
		console.log("Is there a User ID in session?", res)
		if(res){
			self.user = res.data;
		} else {
			$location.url('/');
		}
	})

	self.closeAlert = function(index, array){
		array.splice(index, 1);
	}

	self.login = function(loginUser){
		self.loginErrors = [];
		UserFactory.login(loginUser, function(res){
			console.log(res);
			if(res.data.errors){
				if(loginUser){
					loginUser.email = "";
					loginUser.password = "";
				}
				for(key in res.data.errors){
					self.loginErrors.push({
						"type": "danger",
						"msg": res.data.errors[key]['message']
					})
				}
			} else {
				$location.url('/bids')
			}
		})
	}

	self.logout = function(){
		$cookies.remove('user_id');
		$location.url('/');
	}

	self.createUser = function(newUser){
		self.errors = [];
		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				console.log('errors in user registration')
				if(newUser){
					newUser.password = "";
					newUser.password_confirmation = "";
				}
				for(key in res.data.errors){
					self.registrationErrors.push({
						"type": "danger",
						"msg": res.data.errors[key]['message']
					})
				}
			} else {
				$location.url('/bids');
			}
		})
	}
})
