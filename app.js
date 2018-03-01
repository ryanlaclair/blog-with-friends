// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const express       = require('express'),
      handlebars    = require('express-handlebars'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      session       = require('express-session'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser'),
      flash         = require('connect-flash'),
      controllers   = require('./controllers'),
      db            = require('./config/db'),
      localStrategy = require('./config/auth').localStrategy;

// set up mongoose
mongoose.connect(db);
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

const app = express();

// set handlebars for the view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set up middleware
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'cs601_secret_session',
  resave: false,
  saveUninitialized: false
}));

// set up passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(localStrategy);

// set up controllers
app.use('/', controllers);

// start the server
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});