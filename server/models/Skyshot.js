const mongoose = require('mongoose');

const skyShotSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const Skyshot = mongoose.model('SkyShot', skyShotSchema);

module.exports = Skyshot;