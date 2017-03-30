var mongoose = require('mongoose');

var BidSchema = new mongoose.Schema({
	product: {
		name: {
			type: String,
		},
		image: {
			type: String
		}
	},
	bids:[{
		type: String,
	}],
	current: {
		type: Number,
		default: 0
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null
	}
}, {timestamps: true});

mongoose.model('Bid', BidSchema);
