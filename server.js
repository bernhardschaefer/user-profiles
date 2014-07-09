
// Module dependencies
var express = require('express'); //Web framework
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //MongoDB integration

var user = require('./routes/users');

// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

// Configure Database
mongoose.connect('mongodb://localhost/userProfiles');

// Routing
var router = express.Router();

router.get('/users', user.readUsers);
router.post('/users', user.createUser);
router.get('/users/:id', user.readSingleUser);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

app.use('/api', router);

//Start server
var port = 3000;
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
