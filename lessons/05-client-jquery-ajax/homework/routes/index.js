
var path = require('path');
var IngredientModel = require('../models/ingredientMongoose.js');
var routes = {};



var home = function(req, res){
  res.render("home", {"links": [
  	{url:"/ingredients", text: "View/Edit Ingredients"},
  	{url: "/", text: "Place an order"},
  	{url: "/", text: "Look inside our kitchen"}
  	]
  });
};
module.exports.home = home;




//routes.ingredients = function(req, res) {
 //query for all ingredients, separate by availability, and render
//	Ingredient.find({}, function(err, data) {
//		// separate in stock & out of stock
//		var inData = [];
//		var outData = [];
//		data.forEach(function(d) {
//			var list = d.inStock ? inData : outData;
//			list.push(d);
//		});
//
//		// package data and render
//		var hbsData = {'inStock':formatPrice(inData), 
//					   'outOfStock':formatPrice(outData)};
//		res.render('ingredients', hbsData);
//	});

	
//}