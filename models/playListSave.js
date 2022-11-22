'use strict'
const mongoose = require('mongoose');
const moment = require("jalali-moment");
const playListSaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    playListId: { type: mongoose.Types.ObjectId, ref: 'PlayList', required: true },
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
const playListSave = mongoose.model('playListSave', playListSaveSchema);
module.exports = playListSave

