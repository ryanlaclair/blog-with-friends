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

// A static method on the User model to add a friend to the users feed.
userSchema.statics.addFriend = function(username, friendUsername) {
  Promise.all([
    this.findOne({ username: username }).exec(),
    this.findOne({ username: friendUsername }).exec()
  ]).then((result) => {
    result[0].update({ $push: { friends: result[1]._id }});
  });
}

// A static method on the User model to remove a friend from the users feed.
userSchema.statics.removeFriend = function(username, friendUsername) {
  Promise.all([
    this.findOne({ username: username }).exec(),
    this.findOne({ username: friendUsername }).exec()
  ]).then((result) => {
    result[0].update({ $pull: { friends: result[1]._id }});
  });
}

let User = mongoose.model('User', userSchema);

module.exports = User;