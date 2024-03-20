const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    skyShots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkyShot'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// // set up pre-save middleware to create password
// profileSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // compare the incoming password with the hashed password
// profileSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const Profile = model('Profile', profileSchema);

// module.exports = Profile;
