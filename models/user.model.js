const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    mobile: Number,
    activationCode: Number,
    role: { type: String, enum: ["admin", "user"] },
    avatarId: { type: mongoose.Types.ObjectId, ref: 'File' },
    darkMode: Boolean,
    active: Boolean,
    softDelete: Boolean,
},
    { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;