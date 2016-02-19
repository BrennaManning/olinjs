var express = require('express');
var mongoose = require('mongoose');
var User = require('./../models/userModel.js');
var Twote = require('./../models/twoteModel.js');
var routes = {};

routes.login = function(req, res){
	res.render('home');


}


routes.authenticate = function(req, res){
	User.find({name: req.body.name})
		.exec(function(err, userswithname){
			if(userswithname.length == 0){
				var user = new User(req.body);
				console.log ('password' + user.password)

				req.session.username = user.name
				req.session.password = user.password
				//console.log(username)
				user.save(function(err) {
					//console.log('username:' + username)
					//users.pop(req.session.username);
					res.redirect('/twotterfeed');		
				});
				console.log(req.session.username)
			}
			else{
				req.session.password = req.body.password
				req.session.username = userswithname[0].name;
				console.log ('req.session.password' + req.session.password);
				console.log ('password:' + userswithname[0].password);

				if (req.session.password == userswithname[0].password){
					console.log("Password approved - redirecting");
					res.redirect('/twotterfeed');	
				}
				else{
					console.log("WRONG");
					res.render('home', {'message': 'incorrect username or password'});
				}
				
				
			}
		})
	
}

routes.deletetwotes = function(req, res){
	//db.twotes.remove( { user: $currentUserName}, true )

	console.log("delete route")
	Twote.remove( { user: req.session.username} , true )
		.exec(function(err, user){
			var currentUserObj = {
				name: req.session.username
			} 
			res.send(currentUserObj);


		})
	//res.redirect('/twotterfeed');		
	
	
}

routes.twotterfeed = function(req, res){
	
	var users
	console.log('rendering');
	console.log('twotterfeedroute:');
	//console.log(users)
	//allTwotes = Twote.find();
	
	//console.log(User.find())
	//res.send('Twotter')
	//res.render('twotter', {'message': "Your twotterfeed"});
	//console.log('req session: ' + req.session.username)
	//res.render("twotter", {
    //    name: req.session.username,
    //  })
	//res.json({name:loginInfo.name});
	User.find()
		.exec(function(err, users) {
		if(err){
			res.status(500).send("Twotter User is broken");
		} else {
			users = users

			Twote.find()
				.sort({'$natural':-1}) 
				.exec(function(err, twotes) {
				if(err){
					res.status(500).send("Twotter is broken");
				} else {
					console.log("Twote.find()");

					if (req.session.username){
							res.render("twotter", {
							name: req.session.username,
							twote: twotes,
							userlist: users
						})
					}
					else{
						res.render("loggedout", {
							message: "please log in to use twotter"
						});
					}
				}			
			})
		}			
	})


};


routes.twote = function(req, res){
	var twoteObj = new Twote(req.body);
	twoteObj.user = req.session.username;
	//if(postnumber){
	//	postnumber = postnumber + 1;
	//}
	//else{
	//	var postnumber = 0
	//}
	//twoteObj.postnum = postnumber
	//console.log(username)
	var d = new Date();
	var n = d.getMilliseconds();
	twoteObj.datetime=n;
	twoteObj.save(function(err) {
		//console.log('username:' + username)
		console.log('Twote User:' + req.session.username);
		console.log('Twote Text:' + twoteObj.text);
		console.log('datetime:' + twoteObj.datetime);
		res.redirect('/twotterfeed');		
	});
	
}





module.exports = routes;