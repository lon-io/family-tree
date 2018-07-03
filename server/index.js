// https://github.com/motdotla/dotenv/issues/133#issuecomment-255298822
var dotenv = require('dotenv');
dotenv.config({ silent: true });

var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('underscore');

var app = express();
app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(__dirname + '/../../dist'));

app.options('*', cors());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs
  require('./router')(app);

  // all other routes
  app.get('/*', function(req, res) {
    res.sendStatus(404);
  });

  app.listen(app.get('port'), function() {
    console.log('Server listening on port '+app.get('port'));
  });

});

module.exports = app;
