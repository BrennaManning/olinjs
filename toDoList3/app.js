//require dependencies
var express  = require('express');	//express app
var index = require('./routes/index.js'); //routes   
var mongoose = require('mongoose'); //mongodb                     
var morgan = require('morgan');            
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var path = require('path'); // for path.join
var app = express();

//database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});    

//use
app.use(express.static(__dirname + '/public'));               
app.use(morgan('dev'));                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
//requests
app.get('/api/todos', index);
app.post('/api/todos', index);
app.delete('/api/todos/:todo_id', index);
app.put('/api/todos/:todo_id', index);
app.post('/api/todos/:todo_id', index);
app.get('*', index);
app.get("/", index);

var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});

module.exports = app;