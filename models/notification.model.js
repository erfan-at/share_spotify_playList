const mongoose = require('mongoose');
const moment = require("jalali-moment");
const notificationSchema = new mongoose.Schema({
    value: String,
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

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;