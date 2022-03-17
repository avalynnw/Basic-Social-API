const { MongoDriverError } = require("mongodb");
const { User, Thought } = require("../models");

// Aggregate function to get the number of students overall
const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfUsers) => numberOfUsers);



module.exports = {

  // get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          friendCount: await friendCount(),
        };
        return res.json(userObj);
      })
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
};
