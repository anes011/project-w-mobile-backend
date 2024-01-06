const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema ({
    hostID: {
        type: String,
        required: true
    },
    placeType: {
        type: String,
        required: true
    },
    spaceGiven: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    wifi: {
        type: Boolean,
        required: true
    },
    tv: {
        type: Boolean,
        required: true
    },
    washer: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    airConditioning: {
        type: Boolean,
        required: true
    },
    pool: {
        type: Boolean,
        required: true
    },
    firstAid: {
        type: Boolean,
        required: true
    },
    fireExtinguisher: {
        type: Boolean,
        required: true
    },
    offerPhotos: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    }
});

const offer = mongoose.model('offer', offerSchema);

module.exports = offer;