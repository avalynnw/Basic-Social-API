const { MongoDriverError } = require("mongodb");
const { User, Thought } = require("../models");

// aggregate function to get the number of friends
// const friendCount = async () =>
//   User.aggregate()
//     .count("friendCount")
//     .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        let user_list = [];
        // extracts data from users object and puts each item into a formatted list
        users.forEach((user, index) => {
          user_list[index] = {
            thoughts: user.thoughts,
            friends: user.friends,
            _id: user._id,
            username: user.username,
            email: user.email,
            friendCount: user.friendCount,
          };
        });

        return res.json(user_list);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              thoughts: user.thoughts,
              friends: user.friends,
              _id: user._id,
              username: user.username,
              email: user.email,
              friendCount: user.friendCount,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // delete a user and remove their thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user exists with that ID" })
          : Thought.deleteMany({ username: user.username })
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no thoughts found",
            })
          : res.json({ message: "User and thoughts successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },






  // add a friend
  addFriend(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        return User.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true}
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "unable to find user" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a friend
  deleteFriend(req, res) {
    User.findById(req.params.id)
    .then((user) => {
      return User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true}
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "unable to find user" })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  }



  // deleteUser(req, res) {
  //   User.findOneAndDelete({ _id: req.params.id })
  //   .then((user) => {
  //   !user
  //     ? res.status(404).json({ message: 'No user with that ID' })
  //     : Thought.deleteMany({ username: user.username })

  //   })
  //   .then(() => res.json({ message: 'User and thoughts deleted!' }))
  //   .catch((err) => res.status(500).json(err));
  // },
};
