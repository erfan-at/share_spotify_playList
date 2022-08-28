const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    message: String,
    date: Number,
    softDelete: Boolean
},
    { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
