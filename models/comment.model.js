const mongoose = require('mongoose');
const moment = require("jalali-moment");
const commentSchema = new mongoose.Schema({
    username: String,
    description: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    playListId: { type: mongoose.Types.ObjectId, ref: 'PlayList' },
    // accepted: Boolean,
    email: String,
    mobile: String,
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
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;