const { Schema, Types } = require("mongoose");

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


// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => format_date(timestamp)
      },
  },
  {
    toJSON: {
      getters: true,
    },
    // id: false
  }
);



// reactionSchema.virtual('reactionId').get(function() {
//   return this._id;
// });



module.exports = reactionSchema;
