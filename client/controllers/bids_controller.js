myApp.controller('BidsController', function(BidFactory, UserFactory){

	console.log('instanciating BidsController...');

	let self = this;

	self.errors = {};

	self.index = function(){
		self.errors = {};
		BidFactory.index(function(res){
			self.bids = res.data;
			if(self.bids.length === 0){
				BidFactory.create(function(res){
					socket.emit('startTimer', {});
					self.index();
				});
			}
		})
	}

	self.bid = function(newBid){
		self.errors = {};
		let bidObj = {}
		for(key in newBid){
			bidObj.bid_id = key;
			bidObj.value = newBid[key];
		}
		bidObj._user = UserFactory.user;
		BidFactory.bid(bidObj, function(res){
			if(res.data.errors){
				self.errors[res.data.id] = res.data.errors;
			}
			if(!res.data.errors){
				socket.emit('newBid', {});
			}
		});
	}

	socket.on('updateBids', self.index);

	socket.on('updateClock', function(data){
		self.minutes = data.minutes;
		self.seconds = data.seconds;
	})

});
