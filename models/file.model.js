const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    name: String,
    description: String,
    size: String,
    type: String,
    showName: String,
    rawUrl: String,
    url: String,
    date: Number,
    status: String,
    type: String,
    softDelete: Boolean
},
    { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;

