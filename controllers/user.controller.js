const User = require('../models/user.model');
const moongose = require('mongoose');
const bcrypt = require('bcrypt');

exports.user_create = function(req, res, next){
	const hash = bcrypt.hashSync(req.body.email.toString() + req.body.password.toString(), 10);
	let user = new User({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		password: hash,
		role: req.body.role
	});
	user.save(function(err){
		if(err){
			res.status(404).send('Error desconocido:' + err);
			return next(err);
		}
		res.status(200).send('User Created Successfully.');
	})
}
exports.user_details = function(req, res, next){
	User.findOne({'email':req.params.email}, function ( err, user){
		if(err){ 
		res.status(404).send('No sabemos que a ocurrido');
		return next(err);}
		console.log('email: ' + req.params.email);
		res.send(user);
	});
};
exports.user_update = function(req, res, next){
	console.log(req.body);
	let hash;
	let realPassword = req.body.password;
	if(req.body.newPassword != null) realPassword = req.body.newPassword;
	hash = bcrypt.hashSync(req.body.email.toString() + realPassword, 10);
	User.findOneAndUpdate({email:req.body.backupEmail}, {$set:{name:req.body.name, surname:req.body.surname, email:req.body.email,password:hash, role:req.body.role}},
	function(err, user){
		console.log(user);
		if(err){ 
			res.status(404).send('sa liao');
			return next(err);
		}
		res.status(200).send('User Updated');
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
	if(req.params.email != ''){
		const reqEmail = req.body;
		User.findOne({email:req.body.email}, function(err, user){
			if(err){
				res.status(404).send('No sabemos que ha ocurrido ');
				return next(err);
			}
			if(user != null && user.email == req.body.email.toString()){
				res.status(401).send({'valid':false});
			}else{
				res.status(200).send({'valid':true});
			}
			console.log('request: ' + req.body.email.toString());
		});
	}else{
		res.status(404).send('No se puede dejar el campo email vacio');
	}
}
exports.user_login = function(req, res, next){
	let validated = false;
		let login = null;
		let hash = '';
	if(req.body.email != null && req.body.password != null){
	login = req.body;
	User.findOne({email:login.email}, function(err, user){
		if(err) return next(err);
		validated = bcrypt.compareSync(login.email.toString() + login.password.toString(), user['password']);
		res.status(200).send({'loged':validated});
		});
	}else{
	res.status(404).send('No pueden llegar los campos vacios');
	}
	
}

