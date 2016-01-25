var fs = require('fs');  
var path = require('path');  
      
   /*  fs.readdir(process.argv[2], function (err, list) {  
       list.forEach(function (file) {  
         if (path.extname(file) === '.' + process.argv[3])  
           console.log(file)  
       })  
     })  */


module.exports=function(dir,ext,callback){
	fs.readdir(dir, function(err, file){
		if(err){
			return callback(err);
		}
		new_file=file.filter(function(item){
			if(path.extname(item)==="."+ext)
				return item;
		});
		callback(null,new_file);
	})
}