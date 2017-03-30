var mongoose = require('mongoose');
var Bid = mongoose.model('Bid');
var User = mongoose.model('User');
var products = [
	{name: 'Macbook Pro', image: '/static/img/macbook_pro.jpeg'},
	{name: 'Razer Blade', image: '/static/img/razer_blade.png'},
	{name: 'iPhone 7', image: '/static/img/iphone7.png'},
	{name: 'Nintendo Switch', image: '/static/img/switch.jpg'},
	{name: 'Electric Piano', image: '/static/img/piano.jpg'},
	{name: 'Les Paul Guitar', image: '/static/img/les_paul.jpg'}
]

module.exports = {
	index: function(req, res){
		Bid.find({}).populate('_user').exec(function(err, bids){
			if(err){
				return res.json(err);
			}
			return res.json(bids);
		})
	},
	create: function(req, res){
		let products2 = products.slice(0);
		let randomProducts = [];
		for(let i = 0; i < 3; i++){
			let index = Math.floor(Math.random() * products2.length);
			randomProducts.push(products2[index])
			products2.splice(index, 1);
		}
		let bid1 = new Bid({ product: randomProducts[0] })
		bid1.save(function(err, bid1){
			if(err){
				return res.json(err);
			}
			let bid2 = new Bid({ product: randomProducts[1] })
			bid2.save(function(err, bid2){
				if(err){
				return res.json(err);
				}
				let bid3 = new Bid({ product: randomProducts[2] })
				bid3.save(function(err, bid3){
					if(err){
						return res.json(err);
					}
					return res.json(bid3);
				})
			})
		})
	},
	destroy: function(req, res ){
		Bid.remove({}).exec(function(err){
			if(err){
				return res.json(err);
			}
			Bid.find({}).exec(function(err, bids){
				if(err){
					return res.json(err);
				}
				return res.json(bids);
			})
		})
	},
	update: function(req, res){
		Bid.findById(req.body.bid_id).exec(function(err, bid){
			if(err){
				return res.json(err);
			}
			if(!bid){
				return res.json({
					"errors": "invalid bid"
				})
			}
			if(req.body._user._id == bid._user){
				return res.json({
					"errors": "You may not outbid yourself.",
					"id": bid._id
				})
			}
			if(req.body.value <= bid.current){
				return res.json({
					"errors": "You must bid higher than the current bid.",
					"id": bid._id
				})
			}
			bid.current = Math.floor(req.body.value);
			bid._user = req.body._user;
			bid.save(function(err, bid){
				if(err){
					return res.json(err);
				}
				return res.json(bid);
			})
		})
	}
};
