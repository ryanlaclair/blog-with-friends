const mongoose = require('mongoose'),
      User     = require('./user'),
      Blog     = require('./blog');

// Find any user that may have the given username, ignoring case.
let byName = (username) => {
  return User
    .find({ username: new RegExp(username, "i") });
}

// Find all blog posts that contain the specified keyword, ignoring case.
let byKeyword = (keyword) => {
  return Blog
    .find({ keywords: new RegExp(keyword, "i") })
    .populate('author');
}

module.exports = (search) => {
  return Promise.all([
    byName(search).exec(),
    byKeyword(search).exec()
  ]);
} 