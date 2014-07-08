
// Module dependencies
var express = require('express'); //Web framework
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //MongoDB integration

var UserModel = require('./models/user');

// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Configure Database
mongoose.connect('mongodb://localhost/userProfiles');

// Routing
var router = express.Router();

router.get('/users', function(req, res) {
  return UserModel.find( function(err, users) {
    if (!err) {
      return res.send(users);
    } else {
      return console.log(err);
    }
  });
});

app.use('/api', router);

//Start server
var port = 3000;
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
