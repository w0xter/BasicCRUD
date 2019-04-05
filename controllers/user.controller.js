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
			res.status(404).send('Error desconocido:' + err);
			return next(err);
		}
		res.status(500).send('User Created Successfully.');
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
exports.check = function(req, res, next){
	res.send("Todo OK :D");
}
exports.user_check = function(req, res, next){
	const reqEmail = req.body;
	User.findOne({email:req.body.email}, function(err, user){
		if(err){
			res.status(404).send('No sabemos que ha ocurrido ');
			return next(err);
		}
		if(user != null && user.email == req.body.email.toString()){
			res.status(301).send('El Usuario Ya Existe');
		}else{
			res.status(500).send('Usuario Disponible');
		}
		console.log('request: ' + req.body.email.toString());
	});
}
exports.user_login = function(req, res, next){
	let validated = false;
	const login = req.body;
	User.findOne({email:login.email}, function(err, user){
		if(err) return next(err);
		validated = login.password != null && user['password'] == login.password.toString();
		console.log('User ' + login.email + ' pwd ' + login.password);
		res.send({'loged':validated});
		});
	
}

