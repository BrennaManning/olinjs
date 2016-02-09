var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	'customerName': String,
    'ingredients': [String],
    'totalCost': Number,
    'completed': Boolean
});

module.exports = mongoose.model("Order", orderSchema);


