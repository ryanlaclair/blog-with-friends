const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');;

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

userSchema.plugin(passportLocalMongoose);

userSchema.statics.addFriend = function(username, friendUsername) {
  Promise.all([
    this.findOne({ username: username }).exec(),
    this.findOne({ username: friendUsername }).exec()
  ]).then((result) => {
    result[0].update({ $push: { friends: result[1]._id }});
  });
}

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