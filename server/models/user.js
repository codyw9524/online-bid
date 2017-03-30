var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 255
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(v){
				return /\S*\@\S*\.\S+/g.test(v)
			},
			message: 'A valid email address must be provided.'
		}
	},
	password: {
		type: String,
		required: true,
		maxlength: 255
	}
})

UserSchema.path('email').validate(function(value, done){
	this.model('User').count({email: value}, function(err, count){
		if(err){
			return done(err);
		}
		done(!count);
	});
}, 'Email already exists')

UserSchema.pre('save', function(done){
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
	done();
})

var User = mongoose.model('User', UserSchema);

//bcrypt.hashSync(password, bcrypt.genSaltSync(8))
//bcrypt.compareSync(password, this.password)