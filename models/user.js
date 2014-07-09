var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Schema.ObjectId,
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: String
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
