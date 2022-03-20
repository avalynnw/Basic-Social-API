const { Thought, User } = require('../models');


// helper function to return the proper date ending for displaying the date
const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
}

function format_date(initial_date) {

  let month = initial_date.toLocaleString('default', { month: 'short' });
  let day = initial_date.getDate();
  let year = initial_date.toLocaleString('default', { year: 'numeric' });
  let hour = initial_date.getHours();
  let minute = initial_date.getMinutes();

  let ampm = "am"
  if (hour>12) {
      hour = hour - 12
      if (hour < 10) {
          hour="0"+hour;
      }
      ampm="pm"
  }
  if (minute<10) {
    minute = "0" + minute;
  }


  let final_date = month +" "+day+nth(day)+", "+ year+" at "+hour+":"+minute+" "+ampm;

  return final_date;
}



module.exports = {

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then(async (thoughts) => {

        let thoughts_list = [];
        // extracts data from thoughts object and puts each item into a formatted list
        thoughts.forEach((thought, index) => {
    
            let initial_date = thought.createdAt;

            let formatted_date = format_date(initial_date)

            thoughts_list[index] = {
            _id: thought._id,
            thoughtText: thought.thoughtText,
            username: thought.username,
            createdAt: formatted_date,
            reactions: thought.reactions,
            __v: thought.__v,
            reactionCount: thought.reactionCount
          };
        });

        return res.json(thoughts_list);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },





  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true}
        );
      })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


    // get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.id })
        // .select("-__v")
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json({
                _id: thought._id,
                thoughtText: thought.thoughtText,
                username: thought.username,
                createdAt: format_date(thought.createdAt),
                reactions: thought.reactions,
                __v: thought.__v,
                reactionCount: thought.reactionCount,
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },










  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'no thought with that ID'})
        } 
      })
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },




};
