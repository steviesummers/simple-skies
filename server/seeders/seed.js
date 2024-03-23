const db = require('../config/connection');

const cleanDB = require('./cleanDB');
const profileSeeds = require('./profileSeeds.json');

const mongoose = require('mongoose');
const Profile = require('./../models/Profile.js');
const SkyShot = require('./../models/Skyshot.js');

db.once('open', () => {
  seedProfiles();
  console.log('yes');
})

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/simple-skies', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
//     // Seed profiles and SkyShots
//     seedProfiles();
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// Seed profiles function
function seedProfiles() {
    const profiles = profileSeeds;

    Profile.insertMany(profiles, { ordered: false })
    .then(createdProfiles => {
        console.log('Profiles seeded successfully:', createdProfiles);

        const profileIds = createdProfiles.map(profile => profile.id);
        seedSkyShot(profileIds);
    })
    .catch(err => {
        // If any other error occurs apart from duplicate key error, log it
        if (err.code !== 11000) {
            console.error('Error seeding profiles:', err);
        
    }});
// Seed SkyShots function
function seedSkyShot(profileIds) {
    const skyShots = [
        { date: new Date(), imageUrl: 'image1.jpg', title: 'SkyShot 1', profile: profileIds[0] },
        { date: new Date(), imageUrl: 'image2.jpg', title: 'SkyShot 2', profile: profileIds[1] },
        { date: new Date(), imageUrl: 'image3.jpg', title: 'SkyShot 3', profile: profileIds[2] }
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
