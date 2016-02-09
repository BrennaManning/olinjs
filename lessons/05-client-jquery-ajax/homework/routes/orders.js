var path = require('path');
var IngredientModel = require('../models/ingredientMongoose.js');
var OrderModel = require('../models/orderMongoose.js');
var routes = {};



/*function sumArray(array) {
  for (
    var
      index = 0,              
      length = array.length, 
      sum = 0;               
      index < length;         
      sum += array[index++]   
  );
  return sum;
}

function OrderConstructor(name, ingredients, prices){
  var thisOrderObj= {
    name: name,
    ingredients: ingredients,
    prices: prices,
    cost: sumArray(prices)
  };
  return thisOrderObj;
}

var newOrder = function(orderParams, absolute) {
  var orderText1;
  var orderText2;
  orderText1 = "Thank you for choosing Jessica's Burgers, " + orderParams.name + "!";
  orderText2 = "We have recieved your order for a burger made of: " + orderParams.ingredients + "which comes to a total cost of " + orderParams.cost;
  console.log(orderText1);
  console.log(orderText2);
  var newIngredient = new IngredientModel(OrderConstructor(orderParams.customerName, orderParams.prices, ingredientParams.inStock=true));
    newIngredient.save(function(err){
    if(err){
      res.status(500).send("Error")
    }
    
  return newIngredient;
})
}

routes.getOrderPOST = function(req, res) {
  res.send(newOrder(req.body, true));
};


routes.orders = function(req, res) {
 //query for all ingredients, separate by availability, and render
    IngredientModel.find({}, function(err, data) {
    // separate in stock & out of stock
    var inStockData = [];
    var outStockData = [];
    data.forEach(function(ingredient) {
      var list = ingredient.inStock ? inStockData : outStockData;
      list.push(ingredient);
    });

    // package data and render

    var sortedData = {'inStock':inStockData, 
             'outOfStock':outStockData}; 
    //var hbsData = {'inStock':formatPrice(inData), 
    //         'outOfStock':formatPrice(outData)};
    res.render('orders', sortedData);
  });
}


*/

routes.orders = function (req, res) {
    IngredientModel.find({}, function(err, data) {
    if(err){
        res.status(500).send("Error!");
    }
    else{    
        var inStockData = [];
        var outStockData = [];
        data.forEach(function(ingredient) {
          var list = ingredient.inStock ? inStockData : outStockData;
          list.push(ingredient);
        });

        

        var sortedData = {'inStock':inStockData, 
                 'outOfStock':outStockData}; 
        
        res.render('orders', sortedData);
    }
  });
        
        
}
routes.submitted = function (req, res) {
    var order = req.body;
    order.ingredients = order["ingredients[]"];
    console.log(order.ingredients);
    order.completed = false;
    var newOrder = new OrderModel(order);
    newOrder.save(function (err) {
        if (err) console.log("problem saving order " + err);
    });
   // res.send(newOrder);
    res.render('orders', newOrder);
    console.log('new order = ' + newOrder)


}



module.exports = routes;