// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const mongoose = require('mongoose'),
      db       = require('./db'),
      Blog     = require('../models/blog'),
      Feed     = require('../models/feed'),
      Login    = require('../models/login'),
      User     = require('../models/user');

mongoose.connect(db);
