const express = require('express'),
      Search  = require('../models/search');

const search = express.Router();

// GET /search
//
// Render the search view to allow the logged in user to do a username and
// keyword search.
search.get('/', (req, res) => {
  res.render('search', {
    username: req.user.username,
    nameResult: null,
    keywordResult: null
  });
});

// POST /search
//
// Perform a username and keyword search.
search.post('/', (req, res) => {
  Search(req.body.search).then((result) => {
    res.render('search', {
      username: req.user.username,
      nameResult: result[0],
      keywordResult: result[1]
    });
  });
});

module.exports = search;