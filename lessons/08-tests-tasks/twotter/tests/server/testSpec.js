 // Setup our assertion library
 var expect = require('chai').expect;

 var index = require('../../routes/index');


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

require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var User = require('./../../../models/userModel');

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