let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
	product: {
		
	},
	image: {
		type: String
	}
});

mongoose.model('Product', ProductSchema);
