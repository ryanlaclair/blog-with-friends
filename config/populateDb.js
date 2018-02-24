const mongoose = require('mongoose'),
      db       = require('./db'),
      Blog     = require('../models/blog'),
      Feed     = require('../models/feed'),
      Login    = require('../models/login'),
      User     = require('../models/user');

mongoose.connect(db);
