const mongoose = require('mongoose'),
      User     = require('./user'),
      Blog     = require('./blog');

let byName = (username) => {
  return User
    .find({ username: new RegExp('^' + username + '$', "i") });
}

let byKeyword = (keyword) => {
  return Blog
    .find({ keywords: new RegExp('^' + keyword + '$', "i") })
    .populate('author');
}

module.exports = (search) => {
  return Promise.all([
    byName(search).exec(),
    byKeyword(search).exec()
  ]);
} 