const mongoose = require('mongoose');
const moment = require("jalali-moment");
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    createdAt: { type: Number, default: moment(new Date()).format('X') },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
