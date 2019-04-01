const Book = require('../models/book.model');
//BASIC CRUD
exports.book_create = function(req, res, next){
	let book = new Book({
		title: req.body.title,
		author: req.body.author,
		rate: req.body.rate,
		summary: req.body.summary
	});
	book.save(function(err){
		if(err){
			return next(err);
		}
		res.send("Book added succesfully");
	})
};
exports.book_details = function(req, res, next){
	Book.findById(req.params.id, function(err, book){
		if(err) return next(err);
		res.send(book);
	});
};
exports.book_update = function(req, res, next){
	Book.findOneAndUpdate(req.params.id, {$set: req.body},
	function(err, book){
		if(err) return next(err);
		res.send('Book Updated');
		res.send(book);
	});
};
exports.book_delete = function(req, res, next){
	Book.findOneAndDelete(req.params.id, function(err){
		if(err) return next(err);
		res.send('Book Deleted');
	});
};
//SEARCH AND FILTER
exports.book_search = function(req, res, next){
	const field = req.params.book_field;
	const book_info = req.params.book_info;
	if((field == 'author' || field == 'title' || field == 'rate') && book_info != ''){
		 Book.find({field:book_info}, function(err, docs){
			if(err) return next(err);
			res.send(docs);
		});
	}else{
		res.send("No existe ningún campo con ese nombre");
	}
};

