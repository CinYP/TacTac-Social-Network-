const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Create empty array to hold the users
  const users = [];

  let thoughts 

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    thoughts = getRandomThoughts(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const email = `${fullName}@domain.com`; 

    users.push({
      first,
      last,
      username: `${fullName}`,
      email, 
      thoughts
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  // await Thought.collection.insertOne({
  //   thoughts 
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('🌱 Seeding completed!! 🌱');
  process.exit(0);
});
