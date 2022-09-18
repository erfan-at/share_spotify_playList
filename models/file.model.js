const mongoose = require('mongoose');
const moment = require("jalali-moment");
const fileSchema = new mongoose.Schema({
    name: String,
    description: String,
    size: String,
    type: String,
    showName: String,
    rawUrl: String,
    url: String,
    createdAt: { type: Number, default: moment(new Date()).format('X') },
    status: String,
    type: { type: String, enum: ["avatar", "playList", "post", "postCover"] },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;

