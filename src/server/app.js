var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('underscore');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.options('*', cors());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/family-tree');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Person = require('./person.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs
  // select all
  app.get('/persons', function(req, res) {
    Person.find({})
      .populate('parent')
      .lean()
      .exec()
      .then(
        persons => {
          return res.json(persons)
        }
      )
      .catch(err => {
        return console.log(err);
      })
  });

  // count all
  app.get('/persons/count', function(req, res) {
    Person.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/person', function(req, res) {
    let person = {
      is_root: req.body.is_root,
      data: {
        deletable: req.body.data.deletable,
        name: req.body.data.name,
        node_open: req.body.node_open
      },
      parent: req.body.parent,
      children: []
    }
    let obj = new Person(person);
    obj.save(function(err, doc) {
      if(err) return console.error(err);
      res.json(doc);
    });
  });

  // find by id
  app.get('/person/:id', function(req, res) {
    Person.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // updateTree by id
  app.put('/person/:id', function(req, res) {
    Person.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/persons/:id/:nodes', function(req, res) {
    Person.find({_id: req.params.id})
      .lean()
      .exec()
      .then(
        doc => {
          let nodes = req.params.nodes.split(',');
          console.log(nodes);
          _.each(nodes, (node_id) => {
            console.log(node_id);
            Person.findOneAndRemove({_id: node_id}, function(err) {
              if(err) return console.error(err);
            });
          });
          if (doc.parent !== null) {
            Person.findOneAndUpdate({children: req.params.id}, {$pull: {_id: req.params.id}}, function(err) {
            });
          }
          res.sendStatus(200);
        }
      )
      .catch(err => {
        return console.log(err);
      })
  });


  // all other routes
  app.get('/*', function(req, res) {
    res.sendStatus(404);
  });

  app.listen(app.get('port'), function() {
    console.log('Server listening on port '+app.get('port'));
  });

});

module.exports = app;
