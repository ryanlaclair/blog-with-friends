const mongoose = require('mongoose'),
      Blog     = require('./blog');

module.exports = (friends) => {
  let promises = [];

  for (i=0; i<friends.length; i++) {
    promises.push(Blog
      .findOne({ author: friends[i]._id })
      .populate('author')
      .exec()
    );
  }

  return Promise.all(promises);
}