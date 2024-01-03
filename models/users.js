const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usersSchema = new Schema ({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    profilePhoto: {
        type: String,
        default: 'https://res.cloudinary.com/dmvjkyphz/image/upload/v1704295450/output-onlinepngtools_plva8b.png'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

usersSchema.pre('save', async function (next) {
    if (!this.isModified) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        return next(err)
    }
});



const users = mongoose.model('users', usersSchema);

module.exports = users;