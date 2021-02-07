const { model, Schema } = require('mongoose');

const userSchema = new Schema({
   username: String,
   email: String,
   password: String,
   friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Users'
   }],
   rooms: [{
      type: Schema.Types.ObjectId,
      ref: 'Rooms'
   }],
});

module.exports = model("Users", userSchema);