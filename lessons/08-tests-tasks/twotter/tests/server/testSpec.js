 // Setup our assertion library
 var expect = require('chai').expect;

 var index = require('../../routes/index');
 var User = require('./../models/userModel.js');
 var Twote = require('./../models/twoteModel.js');
 var app = require('./../../app.js')



 // Sample tests
 describe("A test suite", function() {
 	// Synchronous
 	it('should use expect syntax', function() {
 		expect(false).not.to.be.true;
 	});

 	// Async
 	it('should work asynchronously', function(done) {
 		setTimeout(function() {
 			expect(true).to.be.true;
 			done();
 		}, 1000);
 	});
 });

// why are you requiring everything twice with different paths?? Things are not working...

require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var User = require('./../../../models/userModel');


  var call_done = function(done, err){
    if(err) return done(err);
    done();
  }



describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      name: 'test_user',
      password: 'test_password'
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});


// There wasn't a comma after text. How did you submit this if it wasn't working? Also all describe test suites were not fully completed with brackets..
describe('Twote Model', function() {
  it('should create a new twote', function(done) {
    var twote = new Twote({
      user: 'test_user',
      text: 'test_twote_content',
      datetime: new Date().toLocaleString()
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});


 describe("Twotter App", function(){
   it('should return 200 OK on GET /', function(done){
    request(app).get('/').expect(200).end(function(err, res){
    });
   });
 });