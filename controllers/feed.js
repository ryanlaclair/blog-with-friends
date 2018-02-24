const express = require('express'),
      Feed    = require('../models/feed'),
      User    = require('../models/user');

const feed = express.Router();

feed.get('/', (req, res) => {
  res.render('feed', {
    username: req.user.username
  });;
});

feed.post('/', (req, res) => {
  User.addFriend(req.user.username, req.body.friendUsername);
});

feed.get('/:username', (req, res) => {
  res.redirect('../' + req.params.username + '/blogs');
});

feed.delete('/:username', (req, res) => {
  User.removeFriend(req.user.username, req.params.username);
});

module.exports = feed;