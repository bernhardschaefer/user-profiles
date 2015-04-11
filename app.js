/**
 * Creates, configures, and exports the express app
 */

// Module dependencies
var express = require('express'); //Web framework
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

var user = require('./routes/users');

// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('combined')); // placed before static files middleware so that all requests are logged
app.use(express.static(__dirname + '/public'));

// Routing
var router = express.Router();

router.get('/users', user.readUsers);
router.post('/users', user.createUser);
router.get('/users/:id', user.readSingleUser);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

app.use('/api', router);

module.exports = app;
