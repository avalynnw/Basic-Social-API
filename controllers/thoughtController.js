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



module.exports = {

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then(async (thoughts) => {

        let thoughts_list = [];
        // extracts data from thoughts object and puts each item into a formatted list
        thoughts.forEach((thought, index) => {
            
            let formatted_date = thought.createdAt;
            let month = formatted_date.toLocaleString('default', { month: 'short' });
            let day = formatted_date.getDate();
            let year = formatted_date.toLocaleString('default', { year: 'numeric' });
            let hour = formatted_date.getHours();
            let minute = formatted_date.getMinutes();

            let ampm = "am"
            if (hour>12) {
                hour = hour - 12
                if (hour < 10) {
                    hour="0"+hour;
                }
                ampm="pm"
            }

            formatted_date = month +" "+day+nth(day)+", "+ year+" at "+hour+":"+minute+" "+ampm;

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
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },




};
