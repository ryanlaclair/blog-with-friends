const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');;

// the schema for a user
let userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  username: { type: String, required: true, unique: true },
  password: String
});

// use the passport-local-mongoose plugin to simplify hash and salt generation
// for authentication using passport and mongodb
userSchema.plugin(passportLocalMongoose);

// A method on a User model instance to add a friend to the users feed.
userSchema.methods.addFriend = function(friendUsername) {
  this.model('User').findOne({ username: friendUsername }, (err, user) => {
    if (!err) {
      this.update({ $addToSet: { friends: user._id }}).exec();;
    }
  });
}

// A method on a User model instance to remove a friend from the users feed.
userSchema.methods.removeFriend = function(friendUsername) {
  this.model('User').findOne({ username: friendUsername }, (err, user) => {
    if (!err) {
      this.update({ $pull: { friends: user._id }}).exec();;
    }
  });
}

let User = mongoose.model('User', userSchema);

module.exports = User;