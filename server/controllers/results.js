var mongoose = require('mongoose');

var Bid = mongoose.model('Bid');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Result = mongoose.model('Result');

module.exports = {
	index: function(req, res){
		Result.find({}).exec(function(err, results){
			if(err){
				return res.json(err);
			}
			return res.json(results);
		})
	},
	create: function(req, res){
		console.log('creating results... ');

		Bid.find({}).exec(function(err, bids){
			if(err){
				return res.json(err);
			}
			if(bids.length === 0){
				return res.json({
					"errors": "no bids currently in DB"
				})
			}
			let result1 = new Result({
				_product: {name: bids[0].product.name, image: bids[0].product.image},
				_user: bids[0]._user,
				price: bids[0].current
			})

			result1.save(function(err, result1){
				if(err){
					return res.json(err);
				}
				let result2 = new Result({
					_product: {name: bids[1].product.name, image: bids[1].product.image},
					_user: bids[1]._user,
					price: bids[1].current
				})

				result2.save(function(err, result2){
					if(err){
						return res.json(err);
					}
					let result3 = new Result({
						_product: {name: bids[2].product.name, image: bids[2].product.image},
						_user: bids[2]._user,
						price: bids[2].current
					})

					result3.save(function(err, result3){
						if(err){
							return res.json(err);
						}
						Bid.remove({}).exec(function(err){
							if(err){
								return res.json(err);
							}
							Result.find({}).exec(function(err, results){
								if(err){
									return res.json(err);
								}
								return res.json(results);
							})
						})
					})
				})
			})
		})
	},
	destroy: function(req, res){
		Result.remove({}).exec(function(err){
			if(err){
				return res.json(err);
			}
			return res.json({
				"success": "all results removed from db"
			})
		})
	}
}