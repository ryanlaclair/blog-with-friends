// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

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

// perform username and keyword search
module.exports = (search) => {
  // sanitize input for regex
  search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

  return Promise.all([
    byName(search).exec(),
    byKeyword(search).exec()
  ]);
} 