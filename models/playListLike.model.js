'use strict'
const mongoose = require('mongoose');
const moment = require("jalali-moment");
const playListLikeSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    playListId: { type: mongoose.Types.ObjectId, ref: 'PlayList', required: true },
    type: { type: String, enum: ["postLike", "playListLike", "postSave", "playListSave"] },
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
const playListLike = mongoose.model('playListLike', playListLikeSchema);
module.exports = playListLike




