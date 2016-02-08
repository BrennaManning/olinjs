
var path = require('path');
var IngredientModel = require('../models/ingredientMongoose.js');
var routes = {};

var home = function(req, res){
  res.render("home", {"links": [
  	{url:"/ingredients", text: "View/Edit Ingredients"},
  	{url: "/orders", text: "Place an order"},
  	{url: "/kitchen", text: "Look inside our kitchen"}
  	]
  });
};
module.exports.home = home;


