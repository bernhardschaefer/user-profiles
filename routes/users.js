var UserModel = require('../models/user');

var user = {};

var handleDatabaseResponse = function(res, err, data, next) {
  if (err) {
    next(err);
  } else {
    if (data === null) {
      res.send(404, 'Not found');
    } else {
      res.send(data);
    }
  }
};

user.readUsers = function(req, res, next) {
  UserModel.find(function(err, users) {
    handleDatabaseResponse(res, err, users, next);
  });
};

user.createUser = function(req, res, next) {
  var user = new UserModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });
  user.save(function (err) {
    handleDatabaseResponse(res, err, user, next);
  });
  
};

user.readSingleUser = function(req, res, next) {
  UserModel.findById(req.params.id, function (err, user) {
    handleDatabaseResponse(res, err, user, next);
  });
};

user.updateUser = function(req, res, next) {
  UserModel.findById(req.params.id, function(err, user) {
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.save(function(err) {
      handleDatabaseResponse(res, err, user, next);
    });
  });
};

user.deleteUser = function(req, res, next) {
  UserModel.findById(req.params.id, function(err, user) {
    user.remove( function(err) {
      handleDatabaseResponse(res, err, user, next);
    });
  });
};

module.exports = user;
