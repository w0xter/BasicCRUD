const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
		name: {type: String,required:true, max:100},
		surname: {type: String,required:true, max:100},
		email: {type: String,required:true, max:100, unique:true},
		password: {type: String, required:true, max:15},
		role: {type: String,required:true,  max:50}
});
module.exports = mongoose.model('User', userSchema);
