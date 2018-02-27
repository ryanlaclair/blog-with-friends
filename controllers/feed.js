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
    personal: false,
    user: req.user
  });;
});

// POST /feed
//
// Add a blog friend to the logged in users feed.
feed.post('/', (req, res) => {
  req.user.addFriend(req.body.user);
  res.end();
});

// DELETE /feed/:user
//
// Remove a friend from the logged in users feed.
feed.delete('/:user', (req, res) => {
  req.user.removeFriend(req.params.user);
  res.end();
});

module.exports = feed;