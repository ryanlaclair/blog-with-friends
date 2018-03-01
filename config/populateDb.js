// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const mongoose = require('mongoose'),
      db       = require('./db'),
      Blog     = require('../models/blog'),
      User     = require('../models/user');

mongoose.connect(db);

let blogID1 = mongoose.Types.ObjectId();
let userID1 = mongoose.Types.ObjectId();

let blog1 = {
  author: userID1,
  title: 'My First Blog Post',
  body: 'This is my first blog post. I was auto-generated. :)',
  keywords: [ 'first', 'new', 'post' ],
  _id: blogID1
};

Blog.create(blog1, (err, blog) => {
  console.log('blog 1 added to database');
})

let user1 = {
  name: {
    first: 'Jimmy',
    last: 'Carbone'
  },
  email: 'jimmy@carbone.com',
  blogs: [ blogID1 ],
  friends: [],
  username: 'jcarbone',
  _id: userID1
};

User.register(new User(user1), 'password', (err, user) => {
  if (err) {
    console.log('could not register jcarbone');
  }

  console.log('jcarbone registered');
});

let blogID2 = mongoose.Types.ObjectId();
let userID2 = mongoose.Types.ObjectId();

let blog2 = {
  author: userID2,
  title: 'Another First Blog Post',
  body: 'This is another (but different) first blog post. I was also auto-generated. :)',
  keywords: [ 'first', 'post' ],
  _id: blogID2
};

Blog.create(blog2, (err, blog) => {
  console.log('blog 2 added to database');
})

let user2 = {
  name: {
    first: 'James',
    last: 'Smith'
  },
  email: 'james@smith.com',
  blogs: [ blogID2 ],
  friends: [],
  username: 'jsmith',
  _id: userID2
};

User.register(new User(user2), 'password', (err, user) => {
  if (err) {
    console.log('could not register jsmith');
  }

  console.log('jsmith registered');
});

let blogID3 = mongoose.Types.ObjectId();
let userID3 = mongoose.Types.ObjectId();

let blog3 = {
  author: userID3,
  title: 'CS602 Final Project',
  body: 'The CS602 final project was a lot of work. It feels good to complete it and have a working site!',
  keywords: [ 'cs602', 'project' ],
  _id: blogID3
};

Blog.create(blog3, (err, blog) => {
  console.log('blog 3 added to database');
})

let user3 = {
  name: {
    first: 'cs602',
    last: 'user'
  },
  email: 'cs602@bu.edu',
  blogs: [ blogID3 ],
  friends: [ userID1, userID2 ],
  username: 'cs602_user',
  _id: userID3
};

User.register(new User(user3), 'cs602_secret', (err, user) => {
  if (err) {
    console.log('could not register cs602_user');
  }

  console.log('cs602_user registered')
});