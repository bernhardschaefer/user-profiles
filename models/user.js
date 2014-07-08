var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Schema.ObjectId,
  first_name:  String,
  last_name: String,
  email: String
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
