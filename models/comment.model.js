const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    username: String,
    date: Number,
    description: String,
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    accepted: Boolean,
    email: String,
    mobile: String,
    softDelete: Boolean,
},
    { timestamps: true }
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;