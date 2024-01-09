const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema ({
    reservistID: {
        type: String,
        required: true
    },
    hostID: {
        type: String,
        required: true
    },
    offerID: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    offerPrice: {
        type: String,
        required: true
    },
    offerTitle: {
        type: String,
        required: true
    },
    reservistPhoto: {
        type: String,
        required: true
    },
    reservistName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;