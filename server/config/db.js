/**
 * Created by eric on 28/12/2016.
 */
'use strict'

var config = require('../../config').backend

var DBConfig = {
  client: 'mysql',
  connection: config.mysql.connection
};

var knex = require('knex')(DBConfig);
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;
