var express = require('express');
var mongoose = require('mongoose');

var routes = {};
routes.login = function(req, res){
	res.render('home', {'message':'Please log in'});
}





module.exports = routes;