var mongoose = require('mongoose');   
var ToDo = mongoose.Schema({
  text : String,
  done: {type: Boolean, default: false},
  value:{ type: Number, default: 1 }
});

module.exports = mongoose.model('todo', ToDo); 