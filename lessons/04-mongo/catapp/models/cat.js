var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    'name': String,
    'age': Number,
    'color': [String],
    'personality': [String]
});

module.exports = mongoose.model("Cat", catSchema);