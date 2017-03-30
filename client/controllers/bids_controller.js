myApp.controller('BidsController', function(BidFactory, UserFactory){
	console.log('instanciating BidsController...');
	console.log('socket: ', socket)
	var self = this;

	self.errors = {};

	self.index = function(){
		BidFactory.index(function(res){
			self.bids = res.data;
			if(self.bids.length === 0){
				BidFactory.create(self.index);
			}
		})
	}

	self.bid = function(newBid){
		self.errors = {};
		let bidObj = {}
		for(key in newBid){
			bidObj.bid_id = key
			bidObj.value = newBid[key]
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

	socket.on('updateBids', function(){
		self.index();
	});

});
