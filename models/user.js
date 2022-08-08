const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength:[3, 'Name cannot be less than 3 characters'],
        maxLength: [50, 'Name cannot exceed 50 characters'],
        required: [true, 'You must provide the name of the user']
    },
    email: {
        type: String,
        required: [true, 'User\'s email must be provided'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: [true, 'The email cannot be duplicate']
    },
    password: {
        type: String,
        minLength: [6, 'Password cannot be less than 6 characters long'],
        required: [true, 'User\'s password must be provided']
    }
});

module.exports = mongoose.model('User', userSchema);