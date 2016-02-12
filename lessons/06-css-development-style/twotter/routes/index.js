var express = require('express');
var mongoose = require('mongoose');
var User = require('./../models/userModel.js');

var routes = {};
routes.login = function(req, res){
	res.render('home', {'message':'Welcome to twotter. Who are you?'});
}

routes.authenticate = function(req, res){
	var user = new User(req.body);
	//console.log(username)
	user.save(function(err) {
		//console.log('username:' + username)
		res.redirect('/twotterfeed');		
	});
	req.session.username = user.name
	console.log(req.session.username)
}

routes.twotterfeed = function(req, res){
	console.log('rendering');
	console.log('twotterfeedroute:')
	users = User.find()
	
	//console.log(User.find())
	//res.send('Twotter')
	//res.render('twotter', {'message': "Your twotterfeed"});
	console.log('req session: ' + req.session.username)
	res.render("twotter", {
        name: req.session.username
      })
	//res.json({name:loginInfo.name});
};



module.exports = routes;