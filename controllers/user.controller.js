const User = require('../models/user.model');
const moongose = require('mongoose');
exports.user_create = function(req, res, next){
	let user = new User({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role
	});
	user.save(function(err){
		if(err){
			return next(err);
		}
		res.send('User Created Successfully.');
	})
}
exports.user_details = function(req, res, next){
	User.findById(req.params.id, function ( err, user){
		if(err) return next(err);
		res.send(user);
	});
};
exports.user_update = function(req, res, next){
	User.findOneAndUpdate(req.params.id, {$set: req.body},
	function(err, user){
		if(err) return next(err);
		res.send('User Updated');
	});
};

exports.user_delete = function(req, res, next){
	User.findOneAndDelete(req.params.id, function(err){
		if(err) return next(err);
		res.send('User Deleted succesfully');
	});
};

exports.user_list = function(req, res, next){
	User.find({}, function(err, users){
		if(err) return next(err);
		res.send(users);
	});
}
