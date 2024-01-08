const express = require('express');
const router = express.Router();

// models
const reservationModel = require('../models/reservation');

router.get('/', async (req, res, next) => {
    try {
        const docs = await reservationModel.find();
        res.json({
            count: docs.length,
            reservations: docs
        });
    } catch (err) {
        res.json({
            Error: err.message
        });
    }
});

router.post('/', async (req, res, next) => {
    const reservation = ({
        reservistID: req.body.reservistID,
        hostID: req.body.hostID,
        locationName: req.body.locationName,
        offerPrice: req.body.offerPrice,
        offerTitle: req.body.offerTitle,
        reservistPhoto: req.body.reservistPhoto,
        reservistName: req.body.reservistName
    });

    try {
        const docs = await reservationModel.create(reservation);
        res.json({
            Success: 'Reservation has been created successfully!',
            reservation: docs
        });
    } catch (err) {
        res.json({
            Error: err.message
        });
    }
});

router.delete('/:id', async (req, res, next) => {
    const reservationID = req.params.id;

    try {
        const docs = await reservationModel.findByIdAndDelete(reservationID);
        res.json({
            Success: 'Reservation deleted successfully!',
            deletedReservation: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;