const express = require('express'),
      Search  = require('../models/search');

const search = express.Router();

search.get('/', (req, res) => {
  res.render('search', {
    username: req.user.username,
    nameResult: null,
    keywordResult: null
  });
});

search.post('/', (req, res) => {
  Promise.all([
    Search.byName(req.body.search).exec(),
    Search.byKeyword(req.body.search).exec()
  ]).then((result) => {
    res.render('search', {
      username: req.user.username,
      nameResult: result[0],
      keywordResult: result[1]
    });
  });
});

module.exports = search;