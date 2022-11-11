const mongoose = require('mongoose');
const moment = require("jalali-moment");
const postPlayListUserPivotSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    playListId: { type: mongoose.Types.ObjectId, ref: 'PlayList', required: true },
    // userLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
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
const postPlayListUserPivot = mongoose.model('PostPivot', postPlayListUserPivotSchema);
module.exports = postPlayListUserPivot