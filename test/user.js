var should = require('should'); 
var request = require('supertest');  
var mongoose = require('mongoose');
var app = require('../app');

describe('user rest api', function() {
  var userEndpoint = '/api/users/';
  var testDbUrl = 'mongodb://localhost/userProfilesTest';

  var compareNameAndMail = function(user1, user2) {
    user1.first_name.should.equal(user2.first_name);
    user1.last_name.should.equal(user2.last_name);
    user1.email.should.equal(user2.email);
  };

  var user = {
    first_name: 'Barack',
    last_name: 'Obama',
    email: 'president@whitehouse.gov'
  };

  var userId; 

  it('should create a user using POST', function(done) {
    request(app)
    .post(userEndpoint)
    .send(user)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.have.property('_id');
      userId = res.body._id;
      done();
    });
  });

  it('retrieve the created user using GET', function(done) {
    request(app)
    .get(userEndpoint + userId)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      compareNameAndMail(res.body, user);
      done();
    });
  });

  it('update the created user using PUT', function(done) {
    var user2 = JSON.parse(JSON.stringify(user)); // simple clone
    user2.first_name = 'new first';
    request(app)
    .put(userEndpoint + userId)
    .send(user2)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      compareNameAndMail(res.body, user2);
      done();
    });
  });

  it('should create a second user using POST', function(done) {
    request(app)
    .post(userEndpoint)
    .send({
      first_name: 'Second',
      last_name: 'User',
      email: 'test@web.de'
    })
    .expect(200, done);
  });

  it('should return two total users', function(done) {
    request(app)
    .get(userEndpoint)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.have.lengthOf(2);
      done();
    });
  });

  it('delete the first user using DELETE', function(done) {
    request(app)
    .delete(userEndpoint + userId)
    .expect(200, done);
  });

  it('should return one total users', function(done) {
    request(app)
    .get(userEndpoint)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.have.lengthOf(1);
      done();
    });
  });

  it('fail to create a user without a first name using POST', function(done) {
    request(app)
    .post(userEndpoint)
    .send({
      first_name: '',
      last_name: 'last',
      email: 'test@web.de'
    })
    .expect(404)
    .end(function(err, res) {
      should.exist(err);
      done();
    });
  });

  before(function(done) {
    // connect to test database and delete existing test data
    // code adapted from http://www.scotchmedia.com/tutorials/express/authentication/1/06
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(testDbUrl, function (err) {
        if (err) {
          throw err;
        }
        return clearDB();
      });
    } else {
      return clearDB();
    }
  });

  after(function(done) {
    mongoose.disconnect();
    done();
  });
});
