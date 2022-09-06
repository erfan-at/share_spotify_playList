const mongoose = require('mongoose');
const moment = require("jalali-moment");
const playListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    description: String,
    link: { type: String, required: true },
    like: { type: String, required: true, default: 0 },
    date: { type: Number, default: moment(new Date()).format('X') },
    userLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    tags: { type: Array, required: true },
    // category: {    type: String, enum: ['','','',''] },
    counter: { type: Number, default: 0 },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    // shareTelegramChannel: Boolean,
    block: { type: Boolean, default: false },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true }
);
const PlayList = mongoose.model('PlayList', playListSchema);
module.exports = PlayList;