let mongoose = require('mongoose');

let ResultSchema = new mongoose.Schema({
	_product: {
		name: {
			type: String,
		},
		image: {
			type: String,
		}
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	price: {
		type: Number,
	}
}, {timestamps: true});

mongoose.model('Result', ResultSchema);
