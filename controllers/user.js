const express = require('express');

const user = express.Router({ mergeParams: true });

// GET /:user
//
// Redirect to the personal blog feed route for the given user.
user.get('/', (req, res) => {
  res.redirect('/' + req.params.user + '/blogs');
});

module.exports = user;