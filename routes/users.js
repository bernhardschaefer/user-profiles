var UserModel = require('../models/user');

var user = {};

var handleDatabaseResponse = function(res, err, data) {
  //TODO add proper logging
  if (err) {
    console.log(err);
    res.status(500).send(err);
  } else {
    if (data === null) {
      res.status(404).send('Not found');
    } else {
      res.send(data);
    }
  }
};

user.readUsers = function(req, res) {
  UserModel.find(function(err, users) {
    handleDatabaseResponse(res, err, users);
  });
};

user.createUser = function(req, res) {
  var user = new UserModel({
    //TODO add validation
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });
  user.save(function (err) {
    handleDatabaseResponse(res, err, user);
  });
  
};

user.readSingleUser = function(req, res) {
  UserModel.findById(req.params.id, function (err, user) {
    handleDatabaseResponse(res, err, user);
  });
};

user.updateUser = function(req, res) {
  UserModel.findById(req.params.id, function(err, user) {
    //TODO add validation
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.save(function(err) {
      handleDatabaseResponse(res, err, user);
    });
  });
};

user.deleteUser = function(req, res) {
  UserModel.findById(req.params.id, function(err, user) {
    user.remove( function(err) {
      handleDatabaseResponse(res, err, user);
    });
  });
};

module.exports = user;
