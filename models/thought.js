const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

function format_date(initial_date) {
  let month = initial_date.toLocaleString("default", { month: "short" });
  let day = initial_date.getDate();
  let year = initial_date.toLocaleString("default", { year: "numeric" });
  let hour = initial_date.getHours();
  let minute = initial_date.getMinutes();

  let ampm = "am";
  if (hour > 12) {
    hour = hour - 12;
    if (hour < 10) {
      hour = "0" + hour;
    }
    ampm = "pm";
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  let final_date =
    month +
    " " +
    day +
    nth(day) +
    ", " +
    year +
    " at " +
    hour +
    ":" +
    minute +
    " " +
    ampm;

  return final_date;
}

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};


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
          get: timestamp => format_date(timestamp)
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
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
