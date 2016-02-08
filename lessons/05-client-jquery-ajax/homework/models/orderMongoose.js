var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	'customerName': String,
    'ingredients': [String],
    'itemPrice': [Number],
    'completed': Boolean
});

module.exports = mongoose.model("Order", orderSchema);


