const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
		title: {type: String, required:true, max:100},
		author: {type: String, required:true, max:100},
		rate: {type: Number, required:true},
		summary: {type: String, required: false, max:500}
	});
module.exports = mongoose.model('Book', bookSchema);
