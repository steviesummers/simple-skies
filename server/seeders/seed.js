const db = require('../config/connection');
const { Profile } = require('../models');
const cleanDB = require('./cleanDB');
const profileSeeds = require('./profileSeeds.json');

const mongoose = require('mongoose');
const User = require('./../models/User.js');
const SkyShot = require('./../models/Skyshot.js');

db.once('open', () => {
  seedUsers();
  console.log('yes');
})

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/simple-skies', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
//     // Seed users and SkyShots
//     seedUsers();
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// Seed users function
function seedUsers() {
    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' }
    ];

    User.insertMany(users, { ordered: false })
    .then(createdUsers => {
        console.log('Users seeded successfully:', createdUsers);
        seedSkyShot(createdUsers);
    })
    .catch(err => {
        // If any other error occurs apart from duplicate key error, log it
        if (err.code !== 11000) {
            console.error('Error seeding users:', err);
        
    }});
// Seed SkyShots function
function seedSkyShot(users) {
    const skyShots = [
        { date: new Date(), imageUrl: 'image1.jpg', title: 'SkyShot 1', user: users[0]._id },
        { date: new Date(), imageUrl: 'image2.jpg', title: 'SkyShot 2', user: users[1]._id },
        { date: new Date(), imageUrl: 'image3.jpg', title: 'SkyShot 3', user: users[2]._id }
    ];

    SkyShot.create(skyShots)
        .then(createdSkyShots => {
            console.log('SkyShots seeded successfully:', createdSkyShots);
        })
        .catch(err => {
            console.error('Error seeding SkyShots:', err);
        });
}}











// db.once('open', async () => {
//   try {
//     await cleanDB('Profile', 'profiles')
//     await Profile.create(profileSeeds);

//     console.log('all done!');
//     process.exit(0);
//   } catch (err) {
//     throw err;
//   }
// });
