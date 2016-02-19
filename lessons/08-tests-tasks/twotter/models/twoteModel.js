var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
	user: String,
	text: String,
	datetime: Number

	//postnum: Number
});

module.exports = mongoose.model('Twote', twoteSchema);