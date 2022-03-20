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
      .select('-__v')
      .then(async (user) =>
        
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
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




// delete a user
deleteUser({ params }, res) {
  User.findOneAndDelete({ _id: params.id })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      Thought.deleteMany({ username: user.username })
      res.json({ message: 'User was deleted!' });
    })
    .catch((err) => res.status(400).json(err));
},
};
