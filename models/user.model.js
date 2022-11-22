'use strict'
const mongoose = require('mongoose');
const moment = require("jalali-moment");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    username: { type: String, /*required: true,*/  unique: true },
    bio: String,
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
    createdAt: { type: Number, required: true, default: moment(new Date()).format('X') },
    updatedAt: Number,
    deletedAt: Number,
    softDelete: { type: Boolean, default: false }
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        },
        versionKey: false
    }
);


// var handleE11000 = function (error, res, next) {
//     console.log("*******----------***********---------")
//     console.log(error)
//     console.log("*******----------***********---------")
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//         next(new Error
//             (`قبلا استفاده شده است ${Object.keys(error.keyPattern)[0]} این`)
//             );


//     } else {
//         next();
//     }
// };
// userSchema.post('save', handleE11000);
// userSchema.post('update', handleE11000);
// userSchema.post('findOneAndUpdate', handleE11000);
// userSchema.post('insertMany', handleE11000);


const User = mongoose.model('User', userSchema);

module.exports = User;