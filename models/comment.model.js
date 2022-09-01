const mongoose = require('mongoose');
const moment = require("jalali-moment");
const commentSchema = new mongoose.Schema({
    username: String,
    date: { type: Number, default: moment(new Date()).format('X') },
    description: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    playListId: { type: mongoose.Types.ObjectId, ref: 'PlayList' },
    // accepted: Boolean,
    email: String,
    mobile: String,
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true }
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;