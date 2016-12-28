'use strict'

var bookshelf = require('../../config/db').bookshelf;

var Test = bookshelf.Model.extend({
  tableName: 'test'
})

var Tests = bookshelf.Collection.extend({
  model: Test
});

module.exports = {
  Test: Test,
  Tests: Tests
}
