const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acceptedReservationSchema = new Schema ({
    reservistID: {
        type: String,
        required: true
    },
    offerID: {
        type: String,
        required: true
    },
    offerTitle: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const acceptedReservation = mongoose.model('acceptedReservation', acceptedReservationSchema);

module.exports = acceptedReservation;