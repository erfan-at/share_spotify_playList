'use strict'
const mongoose = require('mongoose');
const moment = require("jalali-moment");
const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
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
const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;