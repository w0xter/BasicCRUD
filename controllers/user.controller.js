const User = require('../models/user.model');

exports.test = function(req, res){
	res.send('EL CONTROLADOR FUCIONA OK!');
};
exports.user_create = function(req, res, next){
	let user = new User({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		role: req.body.role
	});
	user.save(function(err){
		if(err){
			return next(err);
		}
		res.send('User Created Successfully.');
	})
}

