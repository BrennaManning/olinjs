var IngredientModel = require('../models/ingredientMongoose.js');
var OrderModel = require('../models/orderMongoose.js');

var routes = {};

routes.showOrders = function (req, res) {
    OrderModel.find({completed: false})
        .exec(function (err, orders) {
            if (err) {
                res.status(500).send("Error no orders found");
            } else {
                if (orders.length > 0) {
                    res.render("kitchen", {"message": " Orders to fill:", orders: orders});
                } else {
                    res.render("kitchen", {"message": "All orders completed"});
                }
            }
        });
}

routes.completeOrder = function (req, res) {
    OrderModel.findByIdAndUpdate(req.body.id, {'completed': true}, function (err, order) {
        if (err) {
            res.status(500).send("Error! Error in  completing orders");
        } else {
            res.send(order);
        }
    })
}

module.exports = routes;
