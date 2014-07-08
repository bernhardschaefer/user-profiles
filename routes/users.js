var UserModel = require('../models/user');

var user = {};

user.readUsers = function(req, res) {
  return UserModel.find( function(err, users) {
    if (!err) {
      return res.send(users);
    } else {
      return console.log(err);
    }
  });
};

module.exports = user;
