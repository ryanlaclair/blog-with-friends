const express = require('express');

const user = express.Router({ mergeParams: true });

user.get('/', (req, res) => {
  res.redirect('/' + req.params.username + '/blogs');
});

user.get('/blogs', (req, res) => {
  res.send('GET /:username/blogs');
});

user.post('/blogs', (req, res) => {
  res.send('POST /:username/blogs');
});

module.exports = user;