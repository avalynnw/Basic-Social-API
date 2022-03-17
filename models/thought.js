const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

// Schema to create Post model
const thoughtSchema = new Schema(
    {
        thoughtText: {
          type: String,
          required: true,
          maxlength: 280,
          minlength: 1,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
      },
      {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our Post model
const Thought = model('post', thoughtSchema);

module.exports = Thought;
