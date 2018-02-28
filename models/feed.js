// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const mongoose = require('mongoose'),
      Blog     = require('./blog');

module.exports = (friends) => {
  return Promise.all(friends.map((friend) => {
    return Blog
      .findOne({ author: friend })
      .sort({ 'date': -1 })
      .populate('author')
      .exec()
  }));
}