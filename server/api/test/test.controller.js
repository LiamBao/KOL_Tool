'use strict'

var Test = require('./test.model').Test
var Tests = require('./test.model').Tests

exports.index = function (req, res) {
  Tests.forge()
    .fetch()
    .then(function (collection) {
      res.status(200).json(collection.toJSON())
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}

exports.create = function (req, res) {
  Test.forge({
    name: 'name007',
    desc: 'desc007'
  })
    .save()
    .then(function (test) {
      res.status(200).json({id: test.get('id')})
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}
