var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var index = require("./routes/index");
var getIngredient = require("./routes/getIngredient");
var myOrders = require("./routes/orders");
var kitchen = require("./routes/kitchen");
var mongoose = require("mongoose");
var app = express();

var PORT = 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Requests --> that are handled by the methods avialable in index.js, getIngredient.js and myOrders.js
app.get("/", index.home);
app.get("/getIngredient", getIngredient.getIngredientGET);
app.post("/getIngredient", getIngredient.getIngredientPOST);
app.post("/getIngredient", getIngredient.getIngredientPOST);
app.get('/ingredients', getIngredient.ingredients);
app.post('/outOfStock', getIngredient.outOfStock);
app.get('/orders', myOrders.orders);
app.post('/orders/recieved', myOrders.submitted);
//app.post("orderSubmitted, ")
app.get('/kitchen', kitchen.showOrders);


mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
