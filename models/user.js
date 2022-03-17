const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      match: `/.+\@.+\..+/`,
      unique: true,
      max_length: 50,
    },
    thoughts: [ thoughtSchema ],
    friends: [ userSchema ],
  },
  {
    toJSON: {
    //   getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// virtual to return the length of the user's friends list on request
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;
