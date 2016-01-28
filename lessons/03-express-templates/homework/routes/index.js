var express = require('express');
var router = express.Router();

/* GET home page. */

//function that constructs and returns cat object
function Cat(name, color, age){
  var cat= {
    name: name,
    color: color,
    age: age
  };
  return cat;
}

var myCats = [];
//random arbitrary number generator from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//was not originally sure of syntax
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



catNameDirectory = ["Oliver", "Jasper", "Smokey", "Mittens", "Kitty"]
catColorDirectory = ["black", "blue", "brown", "gray", "green", "orange", "purple", "red", "white","yellow"]


router.get('/', function(req, res, next) {
  res.render("home", {"links": [
     {url:"/mycats/new", text: "Adopt a new cat!" },
     {url:"/mycats", text: "View my cats"},
     {url:"/mycats/sortbycolor", text: "Sort my cats by color" },
     {url:"/mycats/sendoldesttofarm", text: "Send oldest cat to farm"},
     ]
   });
});

module.exports = router;


router.get('/mycats/new', function(req, res, next) {
	var number0 = getRandomArbitrary(0, 4)
	number0 = Math.floor(number0);
	var number1 = getRandomArbitrary(0, 9)
	number1 = Math.floor(number1);
	var catAge = getRandomArbitrary(0, 20)
	catAge = Math.floor(catAge);
	catName = catNameDirectory[number0];
	catColor = catColorDirectory[number1]
	thisCat = Cat(catName, catColor, catAge)
	myCats.push(thisCat)

  res.render("home", {"newcat": [
     {name: "Your new cat's name is " + catName},
     {color: "Your new cat is a " + catColor + " cat"},
     {age: "Your new cat is " + catAge + " years old."}
     ]
   });
});

module.exports = router;


router.get('/mycats', function(req, res, next) {
	console.log(myCats)
	console.log(myCats.length)
	
	var mycatcolors = []
	var mycatages = []
	var mycatnames = []
	for (i = 0; i < myCats.length; i++){
		mycatnames.push(myCats[i].name)
		mycatcolors.push(myCats[i].color)
		mycatages.push(myCats[i].age)
	} 
	console.log(mycatnames);
  res.render("home", {"catObj":myCats});
});

module.exports = router;



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
var messagetext1 = "" 
var messagetext2 = "" 
var messagetext3 = "" 
if (catquantity > 20){
	messagetext1 = "It is irresponsible to own more than 20 cats"
	messagetext2 = "You cannot give each of them the love and attention they need"
	messagetext3 = "Please do not adopt any more cats until one has gone to the farm"
}


router.get('/mycats/sendoldesttofarm', function(req, res, next){
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
	console.log(goodbyemessage1);


  //res.render("home", {"farewell":goodbyemessage1});
  res.render("home", {"farewell": [
     {message: goodbyemessage1}
     ]
   });
});


module.exports = router;