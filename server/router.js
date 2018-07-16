// Model
var Person = require('./person.model');
var _ = require('underscore');

module.exports = function (app) {
  // select all
  app.get('/persons', function (req, res) {
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
  app.get('/persons/count', function (req, res) {
    Person.count(function (err, count) {
      if (err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/person', function (req, res) {
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
    obj.save(function (err, doc) {
      if (err) return console.error(err);
      res.json(doc);
    });
  });

  // find by id
  app.get('/person/:id', function (req, res) {
    Person.findOne({
      _id: req.params.id
    }, function (err, obj) {
      if (err) return console.error(err);
      res.json(obj);
    })
  });

  // updateTree by id
  app.put('/person/:id', function (req, res) {
    Person.findOneAndUpdate({
      _id: req.params.id
    }, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/persons/:id/:nodes', function (req, res) {
    Person.find({
        _id: req.params.id
      })
      .lean()
      .exec()
      .then(
        doc => {
          let nodes = req.params.nodes.split(',');
          console.log(nodes);
          _.each(nodes, (node_id) => {
            Person.findOneAndRemove({
              _id: node_id
            }, function (err) {
              if (err) return console.error(err);
            });
          });
          if (doc.parent !== null) {
            Person.findOneAndUpdate({
              children: req.params.id
            }, {
              $pull: {
                _id: req.params.id
              }
            }, function (err) {});
          }
          res.sendStatus(200);
        }
      )
      .catch(err => {
        return console.log(err);
      })
  });
}
