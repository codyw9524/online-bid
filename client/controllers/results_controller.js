myApp.controller('ResultsController', function(ResultFactory, $location){
	console.log('instanciating ResultsController...');

	let self = this;

	self.results = [];

	self.index = function(){
		ResultFactory.index(function(res){
			if(Array.isArray(res.data) && res.data.length === 0){
				$location.url('/bids');
			}
			if(Array.isArray(res.data)){
				self.results = res.data;
			}
			if(res.data.errors){
				$location.url('/bids');
			}
		})
	}

	self.create = function(){
		ResultFactory.create(self.index);
	}
})