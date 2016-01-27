

var home = function(req, res){
var date = new Date();
var date = date.toString()
console.log(date);

if(date.includes('Dec 25')){
	responsetext = "YES! Merry Christmas!"
}
else{
	responsetext = "No, today is " + date
}

   res.render("home", {"days": [
     {name:"isitchristmas", response:responsetext},]
   });
};

module.exports.home = home;