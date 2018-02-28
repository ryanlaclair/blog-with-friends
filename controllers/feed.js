// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const express = require('express'),
      Feed    = require('../models/feed');

const feed = express.Router();

// GET /feed
//
// Render the feed view which contains the most recent blog post from each
// of the logged in users friends.
feed.get('/', (req, res) => {
  Feed(req.user.friends).then((result) => {
    res.render('feed', {
      user: req.user,
      blogs: result
    });
  });
});

// POST /feed
//
// Add a blog friend to the logged in users feed.
feed.post('/', (req, res) => {
  req.user.addFriend(req.body.user);
  res.send({ redirect: req.header('Referer') });
});

// DELETE /feed/:user
//
// Remove a friend from the logged in users feed.
feed.delete('/:user', (req, res) => {
  req.user.removeFriend(req.params.user);
  res.send({ redirect: req.header('Referer') });
});

module.exports = feed;