/*//LEVEL3
//var fs = require('fs');
//var path = process.argv[2];
//var data = fs.readFileSync(path).toString().split('\n');
//console.log(data.length-1);

//LEVEL4
//var fs = require('fs');
//var path = process.argv[2];
//var bufferString;
//var bufferStringSplit;
//function counter(callback){
//	fs.readFile(path, function (err, data){
//		bufferString = data.toString();
//		bufferStringSplit = bufferString.split('\n');
//		callback();
//	});
//}
//function log(){
//	console.log(bufferStringSplit.length-1)
//}
//counter(log);

//LEVEL5
//var fs = require('fs');
var path = require('path');

var dirPath = process.argv[2];
var fileExt = "." + process.argv[3];


fs.readdir(dirPath, function(err, list){
	var validFiles = list.filter(function(fileName){
		return path.extname(fileName) === fileExt;
	
			for (var i=0;i<validFiles.length;i++){
			validFiles.forEach(function(){
				console.log(validFiles[i]);
			});
		}
	});
	validFiles.forEach(function(file){
		console.log(file);
	});
});

LEVEL5 BETTER ANSWER

//var fs = require('fs')  
//var path = require('path')  
//      
//     fs.readdir(process.argv[2], function (err, list) {  
//       list.forEach(function (file) {  
//         if (path.extname(file) === '.' + process.argv[3])  
//           console.log(file)  
//       })  
//     })  
   




//LEVEL6

var mymodule = require('./module.js');
mymodule(process.argv[2], process.argv[3], function(err, list){
	if(err){
		console.log(err);
	}else{
		list.forEach(function(file) {
			console.log(file);
		});
	}
})  ;


LEVEL6 BETTER ANSWER

 var filterFn = require('./solution_filter.js')  
     var dir = process.argv[2]  
     var filterStr = process.argv[3]  
       
     filterFn(dir, filterStr, function (err, list) {  
       if (err)  
         return console.error('There was an error:', err)  
       
       list.forEach(function (file) {  
         console.log(file)  
       })  
     })  
   
 ─────────────────────────────────────────────────────────────────────────────  
  _/home/brenna/.nvm/versions/node/v5.4.1/lib/node_modules/learnyounode/exer  
  cises/make_it_modular/solution/solution_filter.js_ :  
   
     var fs = require('fs')  
     var path = require('path')  
       
     module.exports = function (dir, filterStr, callback) {  
       
       fs.readdir(dir, function (err, list) {  
         if (err)  
           return callback(err)  
       
         list = list.filter(function (file) {  
           return path.extname(file) === '.' + filterStr  
         })  
       
         callback(null, list)  
       })  
     }  

   
//LEVEL7

var http = require('http');
http.get(process.argv[2], function(response){
	response.setEncoding('utf8').on("data", function(data){
		console.log(data);
	});
	response.on("error", function(error){
		console.log("Error = " + error);
	});;
	response.on("end", function(end) {
	});
});

//LEVEL7 BETTER
  
     var http = require('http')  
       
     http.get(process.argv[2], function (response) {  
       response.setEncoding('utf8')  
       response.on('data', console.log)  
       response.on('error', console.error)  
     })  
     
//LEVEL8

var http = require('http');
var URL = process.argv[2];
http.get(URL, function(res){
	var result = "";
	res.setEncoding('utf8');
	res.on('data', function(data){
		result += data;
	});
	res.on('end', function(){
		console.log(result.length);
		console.log(result);
	});
	res.on('error', console.error);

});

//LEVEL8 BETTER
//var http = require('http');
//var bl = require('bl')
//http.get(process.argv[2],
//function(request){
//	request.pipe(bl(function(err,data){
//		if(err)return console.error(data) data = data.toString()
//			console.log(data.length) console.log(data)}))})
//	}))
//})

//LEVEL9

var http = require('http');
var URL1 = process.argv[2];
var URL2 = process.argv[3];
var URL3 = process.argv[4];
var url;
var ready1;
var ready2;
var ready3;
function getcontent (url, number){
	http.get(url, function(res){
		var result = "";
		res.setEncoding('utf8');
		res.on('data', function(data){
			result += data;
		});
		res.on('end', function(){
			//console.log(result.length);
			//console.log(result);
			if(number == 1){
				ready1 = true;
			}
			else if(number == 2){
				ready2 = true;
			}
			else if(number == 3){
				ready3 = true;
			}
		});
		res.on('error', console.error);

	});
}
getcontent(URL1, 1);
getcontent(URL2, 2);
getcontent(URL3, 3);
*/

var http = require('http');
var bl = require('bl');
var http = require('http');
var URL1 = process.argv[2];
var URL2 = process.argv[3];
var URL3 = process.argv[4];
var data1;
var data2;
var data3;
http.get(process.argv[2],
function(response){
	response.pipe(bl(function(err,data){
		if(err){
			return console.error(data) 
		}
		data1 = data.toString()
		//console.log(data.length)
		//console.log(data)
		printifdone();

	})
)})

http.get(process.argv[3],
function(response){
	response.pipe(bl(function(err,data){
		if(err){
			return console.error(data) 
		}
		data2 = data.toString()
		//console.log(data.length)
		//console.log(data)
		printifdone();
	})
)})

http.get(process.argv[4],
function(response){
	response.pipe(bl(function(err,data){
		if(err){
			return console.error(data) 
		}
		data3 = data.toString()
		//console.log(data.length)
		//console.log(data)
		printifdone();

	})
)})


function printifdone(){

	if (data1 && data2 && data3){
		console.log(data1);
		console.log(data2);
		console.log(data3);
	}

}
