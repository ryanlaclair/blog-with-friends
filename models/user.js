// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

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

// Use the passport-local-mongoose plugin to simplify hash and salt generation
// for authentication using passport and mongodb
userSchema.plugin(passportLocalMongoose, {
  populateFields: 'friends'
});

// A method on a User model instance to add a friend to the users feed.
userSchema.methods.addFriend = function(user) {
  this.update({ $addToSet: { friends: user }}).exec();;
}

// A method on a User model instance to remove a friend from the users feed.
userSchema.methods.removeFriend = function(user) {
  this.update({ $pull: { friends: user }}).exec();;
}

let User = mongoose.model('User', userSchema);

module.exports = User;