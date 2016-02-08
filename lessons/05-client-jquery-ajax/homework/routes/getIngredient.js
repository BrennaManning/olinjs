var path = require('path');
var IngredientModel = require('../models/ingredientMongoose.js');
var routes = {};
var ingredientText;

function IngredientConstructor(name, price, inStock){
  var thisIngredientObj= {
    name: name,
    price: price,
    inStock: inStock
  };
  return thisIngredientObj;
}

var getIngredient = function(ingredientParams, absolute) {
  //var ingredientText;
  ingredientText = ingredientParams.name + "     $" + ingredientParams.price;
  console.log(ingredientText);
  var newIngredient = new IngredientModel(IngredientConstructor(ingredientParams.name, ingredientParams.price, ingredientParams.inStock=true));
    newIngredient.save(function(err){
    if(err){
      res.status(500).send("Error")
    }
    //else{
    //  res.render("ingredients", {"newIngredient":[
    //    {name: ingredientParams.name},
    //    {price: ingredientParams.price},
    //    {quantity: ingredientParams.quantity}
    //    ]
    //  });
    //}
  return newIngredient;
})
}


routes.getIngredientGET = function(req, res) {
  if (req.xhr) {
    res.send(getIngredient(req.query));
  } else {
    res.send(getIngredient(req.query, true));
  }
};

routes.getIngredientPOST = function(req, res) {
  res.send(getIngredient(req.body, true));
};


//routes.ingredients = function(req,res){
//  res.send("Ingredients")
//}

routes.ingredients = function(req, res) {
  IngredientModel.find({}, function(err, data) {
   
    var inStockData = [];
    var outStockData = [];
    data.forEach(function(ingredient) {
      var list = ingredient.inStock ? inStockData : outStockData;
      list.push(ingredient);
    });

    var sortedData = {'inStock':inStockData, 
             'outOfStock':outStockData}; 

    res.render('ingredients', sortedData);
  });
}


routes.outOfStock = function(req, res) {

  var _id = req.body.id;
 // IngredientModel.update({'_id':_id}, {'inStock':false}, function(err, num, data) {
  //  res.end(_id);

  IngredientModel.update({'_id':_id}, {"$set" : {"array.$.inStock" : false}})  
  //});
}

routes.inStock = function(req, res) {
  var _id = req.body.id;
  IngredientModel.update({'_id': _id}, {'inStock':true}, function(err, num, data) {
    res.end(_id);
  });
}
routes.editIngredient = function(req, res) {
  var _id = req.body.id;
  IngredientModel.update({'_id': _id}, {'name':ingredientParams.name, 'price': ingredientParams.price}, function(err, num, data) {
    res.end(_id);
  });
}



function Edit(ingredient){
    var _id = mongoose.Types.ObjectId(ingredient._id);
    Ingredient.update.update({_id: _id}, {name: person.name, age:person.age, sex:person.sex},
        function(err, items){
            if(err) throw err;
        });
}



module.exports = routes;
