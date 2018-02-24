const express = require('express'),
      Feed    = require('../models/feed');

const feed = express.Router();

feed.get('/', (req, res) => {
  res.render('feed', {
    username: req.user.username,
  });;
});

feed.post('/', (req, res) => {
  res.send('POST /feed');
});

feed.get('/:username', (req, res) => {
  res.redirect('../' + req.params.username + '/blogs');
});

feed.delete('/:username', (req, res) => {
  res.send('DELETE /feed/:username');
});

module.exports = feed;