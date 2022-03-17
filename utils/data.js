const usernames = [
  "sweetrollsblackhole",
  "turnipsbeforesunset",
  "vividbladerunnermoon",
  "spidersevensamurai",
  "vulturesunrisehydra",
  "astronoutspiritpunch",
  "pebblebirthdaycake",
  "sweetpotatowhirlpool",
  "pomegranategravity",
  "climbingdillpickle",
  "mandolingoateggegg",
  "snakehydrainception",
  "brightpuckrose",
  "logsaturnpulsar",
  "grassydoughnuts",
  "eristhegeneral",
  "cakecasablanca",
  "sparrowapplepie",
  "steelblackhole",
  "venusgladiator",
];

const seed_thoughts = [
  "The church has pretty windows",
  "My big sister washes her hair every morning",
  "It would be crushing for him to lose both of his parents in a single year",
  "My dog loves treats",
  "The train is coming early today",
  "We don't need to do everything on the list",
  "The Grand Canyon got snow for the first time in decades, and all the tourists were very excited",
  "If you turn right, you will see a big building",
  "He never calls this late at night",
  "Mary is a fan of theirs",
  "She has a beehive full of bees",
  "He liked chocolate and banana milkshakes because his mom used to make them when he was sick",
  "I work for a bank",
  "Breaking glass can make a loud noise",
  "I want to see the film again",
  "It’s about 8 miles away",
  "Nevermind, then!",
  "Can I lick the bottom of the ice cream container?",
  "What a big eater he is!",
  "What is that huge building in front of us?",
];

// returns a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// returns a random  username
const getRandomUsername = () => `${getRandomItem(usernames)}`;

// generates a random thought that can be added to a user object
// const getRandomThoughts = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       thoughtText: getRandomArrItem(seed_thoughts),
//     });
//   }
//   return results;
// };

const getRandomThought = () => `${getRandomItem(seed_thoughts)}`;

// exports functions for use in seed.js
module.exports = { getRandomUsername, getRandomThought };
