var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var CatModel = require('../models/cat.js');
var catSchema = CatModel.catSchema;



/* GET home page. */

//function that constructs and returns cat object

//Fun fact! You can use some fancy new syntax to create this with less typing {name, color, age, personality} === {name:name, color:color, age:age, personality:personality}. With that syntax you probalby don't even to a function. Be careful using that on the client though cause it won't be supported in older broswers. (I'm looking at you IE)
function Cat(name, color, age, personality){
  var cat= {
    name: name,
    color: color,
    age: age,
    personality: personality
  };
  return cat;
}

var myCats = [];
//random arbitrary number generator from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//was not originally sure of syntax
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
catNameDirectory = ["Oliver", "Jasper", "Smokey", "Mittens", "Kitty", "Edgar","Willy", "Socks", "Bandit"];
catColorDirectory = ["black", "blue", "brown", "gray", "green", "orange", "purple", "red", "white","yellow"];
catPersonalityDirectory = ["shy", "mischievous", "friendly", "loyal", "playful", "sleepy", "adventurous", "lazy", "outdoorsy"];

router.get('/', function(req, res, next) {
  res.render("home", {"links": [
     {url:"/mycats/new", text: "Adopt a new cat!" },
     {url:"/mycats", text: "View my cats"},
     {url:"/mycats/sortbycolor", text: "Sort my cats by color" },
     {url:"/mycats/sendoldesttofarm", text: "Send oldest cat to farm"},
     {url:"/mycats/gray/shy", text:"add /mycats/acolor/apersonality to the url to see cats of those traits."}
     ]
   });
});

module.exports = router;


//MAKE A NEW CAT

router.get('/mycats/new', function(req, res, next) {
	// These names aren't very clear
	var number0 = getRandomArbitrary(0, catNameDirectory.length -1)
	number0 = Math.floor(number0);
	var number1 = getRandomArbitrary(0, 9)
	number1 = Math.floor(number1);
	var number2 = getRandomArbitrary(0, 8)
	number2 = Math.floor(number2);

	var catAge = getRandomArbitrary(0, 20)
	catAge = Math.floor(catAge);

	catName = catNameDirectory[number0];
	catColor = catColorDirectory[number1];
	catPersonality = catPersonalityDirectory[number2];
	var thisCat = Cat(catName, catColor, catAge, catPersonality)
	//You shouldn't try and keep a local copy of the database in a variable. This is pretty space inefficient and it will get deleted when ever the server restarts :/ When ever you are using myCats or you cat myCats based variables, you should be doing a CatModel.find()
	myCats.push(thisCat)

	var  newCatModel = new CatModel(thisCat);

	newCatModel.save(function(err){
		if(err){
			res.send("Error")
		}
		else{
			res.render("home", {"newcat":[
				{name: "your new cat's name is " + catName},
				{color:"Your new cat is a " + catColor + " cat"},
				{age: "Your new cat is " + catAge + " years old"},
				{personality: "Your cat is very " + catPersonality}
				]
			});
		}
	});
});

module.exports = router;


//VIEW CATS

router.get('/mycats', function(req, res, next) {
	console.log(myCats)
	console.log(myCats.length)

	var mycatcolors = []
	var mycatages = []
	var mycatnames = []
	var mycatpersonalities = []

	for (i = 0; i < myCats.length; i++){
		mycatnames.push(myCats[i].name)
		mycatcolors.push(myCats[i].color)
		mycatages.push(myCats[i].age)
		mycatpersonalities.push(myCats[i].personality)
	}
	console.log(mycatnames);

	CatModel.find()
		.exec(function (err, cats) {
			if (err) {
				res.status(500).send("Error could not find cat");
			} else {
				if (cats.length > 0) {
					console.log(cats)

				} else {
					res.send("Cats not found")

				}
				//res.render("home", {"searchResponse": searchResponseMessage, "cats": cats});
				res.render("mycats", {catlist: cats});
			}
		});


});

module.exports = router;


//VIEW BY COLOR

router.get('/mycats/sortbycolor', function(req, res, next) {
	var blueCats = [];
	var blackCats = [];
	var brownCats = [];
	var grayCats = [];
	var greenCats = [];
	var orangeCats = [];
	var purpleCats = [];
	var redCats = [];
	var whiteCats = [];
	var yellowCats = [];

	for(i=0;i < myCats.length; i++){
		//You should really use your database to find these!
		// you could do all of this with
		// CatModel.find().sort({color:-1}).exec(function (err, cats){
		//	 res.render("home", {catObj:cats});
		//})
		if(myCats[i].color == "blue"){
			blueCats.push(myCats[i]);
		} else if(myCats[i].color == "black"){
			blackCats.push(myCats[i]);
		} else if(myCats[i].color == "brown"){
			brownCats.push(myCats[i]);
		} else if (myCats[i].color == "gray"){
			grayCats.push(myCats[i]);
		} else if (myCats[i].color == "green"){
			greenCats.push(myCats[i]);
		} else if(myCats[i].color == "orange"){
			orangeCats.push(myCats[i]);
		} else if(myCats[i].color == "purple"){
			purpleCats.push(myCats[i]);
		} else if (myCats[i].color == "red"){
			redCats.push(myCats[i]);
		} else if (myCats[i].color == "white"){
			whiteCats.push(myCats[i]);
		} else if (myCats[i].color == "yellow"){
			yellowCats.push(myCats[i]);
		}

	}

	var mycatsbycolor = []
	for(i=0;i<blueCats.length;i++){
		mycatsbycolor.push(blueCats[i]);
	}
	for(i=0;i<blackCats.length;i++){
		mycatsbycolor.push(blackCats[i]);
	}
	for(i=0;i<brownCats.length;i++){
		mycatsbycolor.push(brownCats[i]);
	}
	for (i=0;i<grayCats.length;i++){
		mycatsbycolor.push(grayCats[i]);
	}
	for (i=0;i<greenCats.length;i++){
		mycatsbycolor.push(greenCats[i]);
	}
	for (i=0;i<orangeCats.length;i++){
		mycatsbycolor.push(orangeCats[i]);
	}
	for (i=0;i<purpleCats.length;i++){
		mycatsbycolor.push(purpleCats[i]);
	}
	for (i=0;i<redCats.length;i++){
		mycatsbycolor.push(redCats[i]);
	}
	for (i=0;i<whiteCats.length;i++){
		mycatsbycolor.push(whiteCats[i]);
	}
	for (i=0;i<yellowCats.length;i++){
		mycatsbycolor.push(yellowCats[i]);
	}
	console.log("CatsByColor");
	console.log(mycatsbycolor);
	console.log(mycatsbycolor.color)

  res.render("home", {"catObj":mycatsbycolor});
});

module.exports = router;

catquantity = myCats.length
//its nice to have semi colons after each line. It make compresssing your code later on way easier
var messagetext1 = ""
var messagetext2 = ""
var messagetext3 = ""
// You could /n to add a line break in you string instead of having three variables

if (catquantity > 20){
	messagetext1 = "It is irresponsible to own more than 20 cats"
	messagetext2 = "You cannot give each of them the love and attention they need"
	messagetext3 = "Please do not adopt any more cats until one has gone to the farm"
}

router.get('/mycats/sendoldesttofarm', function(req, res, next){
	if (myCats.length > 0){
		var catsbyage = myCats.slice(0);
		var numcats = myCats.length -1;
		var oldestCat

		catsbyage.sort(function(a,b) {
	    return a.age - b.age;
		});
		console.log("by age:");
		console.log(catsbyage);
		myCats = catsbyage;
		oldestCat = myCats[numcats];
		console.log("oldest cat");
		console.log(oldestCat.name);
		myCats = myCats.slice(0, -1);
		console.log("my cats after farm");
		console.log(myCats);
		goodbyemessage1 = "Goodbye " + oldestCat.name + "!  " + oldestCat.name + " is off to a nice farm in the country."
	}
	else{
		goodbyemessage1= "You don't have any cats to send to the farm"
	}
	console.log(goodbyemessage1);


  //res.render("home", {"farewell":goodbyemessage1});
  res.render("home", {"farewell": [
     {message: goodbyemessage1}
     ]
   });
});

module.exports = router;


//VIEW CATS OF A GIVEN COLOR AND PERSONALITY

router.get('/mycats/:color/:personality', function (req, res) {
	var color = req.params.color;
	var personality = req.params.personality;
	CatModel.find({$and:[{'color': color}, {'personality': personality}]})
		.exec(function (err, cats) {
			if (err) {
				res.status(500).send("Error could not find cat");
			} else {
				if (cats.length > 0) {
					searchResponseMessage = "Here are your " + color  + " cats who are " + personality
					console.log(cats)

				} else {
					//res.send("Cats not found")
					searchResponseMessage  = "You do not have any cats who are " + color  + " and " + personality
				}
				//res.render("home", {"searchResponse": searchResponseMessage, "cats": cats});
				res.render("mycats", {catlist: cats});
			}
		});
});

module.exports = router;


//VIEW CATS OF A GIVEN COLOR

router.get('/mycats/:color/', function (req, res) {
	var color = req.params.color;
	CatModel.find({'color': color})
		.exec(function (err, cats) {
			if (err) {
				//Error handling! Yay, everyone else forgets!
				res.status(500).send("Error could not find cat");
			} else {
				if (cats.length > 0) {
					searchResponseMessage = "Here are your " + color  + " cats"
					console.log(cats)

				} else {
					//res.send("Cats not found")
					searchResponseMessage  = "You do not have any cats who are " + color
				}
				//res.render("home", {"searchResponse": searchResponseMessage, "cats": cats});
				res.render("mycats", {catlist: cats});
			}
		});
});

module.exports = router;
