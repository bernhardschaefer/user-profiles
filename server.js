
// Module dependencies
var express = require('express' ); //Web framework
var app = express();
var bodyParser = require('body-parser');

// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var users = [
  {
    "id": "9b6303a3-6445-4821-81a7-e2c10b9ec6ef",
    "first_name": "Aisha",
    "last_name": "Cervantes",
    "email": "aishacervantes@plasmos.com"
  },
  {
    "id": "47b8b8f1-ae66-4ae8-a457-e1cb04856302",
    "first_name": "Little",
    "last_name": "Blair",
    "email": "littleblair@plasmos.com"
  },
  {
    "id": "c3c870d4-b2a0-4608-847c-f6073cc23726",
    "first_name": "Lesa",
    "last_name": "Peck",
    "email": "lesapeck@plasmos.com"
  },
  {
    "id": "be9cb906-f934-42c1-82b2-04b760277a8d",
    "first_name": "Sargent",
    "last_name": "Neal",
    "email": "sargentneal@plasmos.com"
  },
  {
    "id": "02044cee-c826-4b5e-8f90-7d8530a24b8b",
    "first_name": "Eve",
    "last_name": "Logan",
    "email": "evelogan@plasmos.com"
  }
];

// Routing
var router = express.Router();

router.get('/users', function(req, res) {
  return res.json(users);
});

app.use('/api', router);

//Start server
var port = 3000;
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
