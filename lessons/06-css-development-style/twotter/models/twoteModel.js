var mongoose = require('mongoose');
//It would be cool to have done either embedding or referencing of documents. 
var twoteSchema = mongoose.Schema({
	user: String,
	text: String,
	datetime: Number

	//postnum: Number
});

module.exports = mongoose.model('Twote', twoteSchema);
