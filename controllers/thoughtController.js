const { Thought, User } = require("../models");



module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        let thoughts_list = [];
        // extracts data from thoughts object and puts each item into a formatted list
        thoughts.forEach((thought, index) => {
          thoughts_list[index] = {
            _id: thought._id,
            thoughtText: thought.thoughtText,
            username: thought.username,
            createdAt: thought.createdAt,
            reactions: thought.reactions,
            __v: thought.__v,
            reactionCount: thought.reactionCount,
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
          { runValidators: true, new: true }
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
          ? res.status(404).json({ message: "no thought with that ID" })
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


  // update thought
  updateThought(req,res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { thoughtText: req.body.thoughtText} },
      { runValidators: true, new: true },
    )
      .then((user) => {
        if (!user) {
          res.status(404).json('no user found with that id')
        } else {
          res.json(user)
        }
      })
      .catch((err) => res.status(500).json(err));
  },


  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "no thought with that ID" });
        }
      })
      .then(() => res.json({ message: "thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },






  // ================== REACTION ROUTES =========================
  // add a reaction
  addReaction(req, res) {
    Thought.findById(req.params.id)
      .then((thought) => {
        return Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { reactions: { reactionBody: req.body.reactionBody, username: thought.username } } },
          { runValidators: true, new: true}
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "unable to find thought by that id" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a reaction
  deleteReaction(req, res) {
    Thought.findById(req.params.id)
    .then((thought) => {
      return Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: req.params.reactionId } },
        { runValidators: true, new: true}
      );
    })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "unable to find reaction by that id" })
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  }


};
