const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    mobile: Number,
    activationCode: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    role: { type: String, enum: ["admin", "user"], required: true },
    avatarId: { type: mongoose.Types.ObjectId, ref: 'File' },
    telegramChannelShare: { type: Boolean, default: false },
    telegram: String,
    twitter: String,
    instagram: String,
    darkMode: Boolean,
    active: { type: Boolean, default: true },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;