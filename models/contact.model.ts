'use strict'
const mongoose = require('mongoose');
const moment = require("jalali-moment");
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    createdAt: { type: Number, required: true, default: moment(new Date()).format('X') },
    updatedAt: Number,
    deletedAt: Number,
    softDelete: { type: Boolean, default: false }
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        },
        versionKey: false
    }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
