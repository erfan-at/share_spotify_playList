const mongoose = require('mongoose');
const playList = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    link: String,
    like: Number,
    date: Number,
    userLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    authorId: { type: mongoose.Types.ObjectId, ref: 'User' },
    tags: Array,
    // category: {    type: String, enum: ['','','',''] },
    counter: { type: Number, default: 0 },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    softDelete: Boolean,
},
    { timestamps: true }
);
const PlayList = mongoose.model('PlayList', playListSchema);
module.exports = PlayList;