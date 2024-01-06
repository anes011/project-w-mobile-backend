const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// models
const offerModel = require('../models/offer');

router.get('/', async (req, res, next) => {
    try {
        const docs = await offerModel.find();
        res.json({
            count: docs.length,
            offers: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

cloudinary.config({ 
    cloud_name: 'dmvjkyphz', 
    api_key: '692968667559937', 
    api_secret: 'r8VOwytEbVKKfdAPTusg9BnZAFg' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary
});

const upload = multer({ storage: storage });

router.post('/', upload.array('offerPhotos'), async (req, res, next) => {
    const offerPhotos = req.files.map((x) => x.path);

    const offer = ({
        hostID: req.body.hostID,
        placeType: req.body.placeType,
        spaceGiven: req.body.spaceGiven,
        location: req.body.location,
        locationName: req.body.locationName,
        guests: req.body.guests,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        bathrooms: req.body.bathrooms,
        wifi: req.body.wifi,
        tv: req.body.tv,
        washer: req.body.washer,
        parking: req.body.parking,
        airConditioning: req.body.airConditioning,
        pool: req.body.pool,
        firstAid: req.body.firstAid,
        fireExtinguisher: req.body.fireExtinguisher,
        offerPhotos,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    });

    try {
        const docs = await offerModel.create(offer);
        res.json({
            Success: 'Offer has been successfully created!',
            offer: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const offerID = req.params.id;

    try {
        const docs = await offerModel.findByIdAndDelete(offerID);
        res.json({
            Success: 'Offer deleted successfully!',
            offerDeleted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;