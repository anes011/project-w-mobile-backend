const express = require('express');
const router = express.Router();

// models
const acceptedReservation = require('../models/acceptedReservation');

router.get('/', async (req, res, next) => {
    try {
        const docs = await acceptedReservation.find();
        res.json({
            count: docs.length,
            acceptedReservations: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.post('/', async (req, res, next) => {
    const accepted = ({
        reservistID: req.body.reservistID,
        offerID: req.body.offerID,
        offerTitle: req.body.offerTitle,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });

    try {
        const docs = await acceptedReservation.create(accepted);
        res.json({
            Success: 'Reservation has been accepted!',
            acceptedReservation: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const reservationID = req.params.id;

    try {
        const docs = await acceptedReservation.findByIdAndDelete(reservationID);
        res.json({
            Success: 'Deleted successfully!',
            deleted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;