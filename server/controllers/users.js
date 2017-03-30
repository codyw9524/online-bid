var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt')

module.exports = {
	index: function(req, res){
		User.find({}).exec(function(err, doc){
			if(err){
				console.log(err);
			} else {
				res.json(doc)
			}
		})
	},
	create: function(req, res){
		if(req.body.password != req.body.password_confirmation){
			return res.json({
				"errors": {
					"password": {
						"message": "Your passwords do not match",
						"name": "ValidationError",
						"path": "password"
					}
				}
			})
		}
		var user = new User(req.body);
		user.save(function(err, doc){
			if(err){
				return res.json(err)
			} else {
				return res.json(doc)
			}
		})
	},
	show: function(req, res){
		User.findById({_id: req.params.id}).exec(function(err, doc){
			if(err){
				return res.json(err);
			} else {
				return res.json(doc);
			}
		})
	},
	login: function(req, res){
		var isValid = true;
		console.log(req.body)
		User.findOne({email: req.body.email}).exec(function(err, doc){
			if(err || !doc || !req.body.password){
				isValid = false;
				console.log(err)				
			} else {
				bcrypt.compare(req.body.password, doc.password).then(function(hash){
					if(!hash){
						isValid = false;
					}
				})
			}
			if(isValid){
				return res.json(doc);
			}
			return res.json({
				"errors": {
					"login" : {
						"message": "Invalid credentials",
						"name": "ValidationError",
						"path": "login"
					}
				}
			}) 
		})
	}
}

//bcrypt.compareSync(password, this.password)
