const express = require('express'),
      Feed    = require('../models/feed'),
      User    = require('../models/user');

const feed = express.Router();

// GET /feed
//
// Render the feed view which contains the most recent blog post from each
// of the logged in users friends.
feed.get('/', (req, res) => {
  res.render('feed', {
    username: req.user.username
  });;
});

// POST /feed
//
// Add a blog friend to the logged in users feed.
feed.post('/', (req, res) => {
  User.addFriend(req.user.username, req.body.friendUsername);
});

// GET /feed/:username
//
// Redirect to the given users personal feed.
feed.get('/:username', (req, res) => {
  res.redirect('../' + req.params.username + '/blogs');
});

// DELETE /feed/:username
//
// Remove a friend from the logged in users feed.
feed.delete('/:username', (req, res) => {
  User.removeFriend(req.user.username, req.params.username);
});

module.exports = feed;