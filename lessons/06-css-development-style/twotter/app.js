var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var index = require('./routes/index.js');
var mongoose = require('mongoose');
var session = require('express-session')
var app = express();



//var fbAuth = require('./authentication.js');


mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');
// view engine setup
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));

app.get('/', index.login);
app.post('/authenticate', index.authenticate);
app.get('/twotterfeed', index.twotterfeed);
app.post('/twote', index.twote);
app.post('/deletetwotes', index.deletetwotes);



//app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){});
//app.get('/auth/facebook/callback',
//    passport.authenticate('facebook', { successRedirect: '/twotterfeed',
//                                        failureRedirect: '/' })
//);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
