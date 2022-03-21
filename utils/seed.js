const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUsername, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const thoughts = []

  // Get some random assignment objects using a helper function that we imported from ./data
  // const assignments = getRandomThoughts(10);

  // loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {

    const username = getRandomUsername();
    const email = username + "@fakemail.com"
    console.log(username +" "+ email);
    const thoughtText = getRandomThought();



    users.push({
      username,
      email,
    });
    thoughts.push({
      thoughtText,
      username,
    });

  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertMany(thoughts)

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
