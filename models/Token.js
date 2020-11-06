const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const TokenSchema = new Schema({
    token: {
        type: String,
    },
    email: {
        type: String,
        trim: true
    },
    host: {
        type: String,
    },
    boolEmailAuth: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        expires: 300,
        default: Date.now
    },
});

module.exports = mongoose.model('Token', TokenSchema);