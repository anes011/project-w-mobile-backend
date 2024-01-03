const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const bcrypt = require('bcrypt');

// models
const users = require('../models/users');

router.get('/', async (req, res, next) => {
    try {
        const docs = await users.find();
        res.json({
            count: docs.length,
            users: docs
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

router.post('/', upload.single('profilePhoto'), async (req, res, next) => {
    const user = ({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profilePhoto: req.file.path
    });

    try {
        const docs = await users.create(user);
        res.json({
            Success: 'user created successfully!',
            user: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const docs = await users.findByIdAndDelete(userID);
        res.json({
            Success: 'user deleted successfully!',
            userDeleted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await users.findOne({ email: email });

        if (user && await user.comparePassword(password)) {
            res.json({
                Success: 'You are logged-in successfully!',
                userInfo: user
            })
        } else {
            res.json({
                Failure: 'Somthing went wrong :( please re-check your credentials!'
            })
        }
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.error(err);
    }
};

router.patch('/changePassword/:id', async (req, res, next) => {
    const userID = req.params.id;
    const update = req.body;

    try {
        update.password = await hashPassword(update.password)
        const docs = await users.findByIdAndUpdate(userID, {$set: update}, {new: true});
        res.json({
            Success: 'Your password was updated successfully!',
            update: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.patch('/changeProfilePhoto/:id', upload.single('profilePhoto'), async (req, res, next) => {
    const userID = req.params.id;
    const update = req.body;

    update.profilePhoto = req.file.path;

    try {
        const docs = await users.findByIdAndUpdate(userID, {$set: update}, {new: true});
        res.json({
            Success: 'Your profile photo has been updated successfully!',
            update: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;