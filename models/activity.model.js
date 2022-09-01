const mongoose = require('mongoose');
const moment = require("jalali-moment");
const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    endPoint: { type: String, required: true },
    body: String,
    date: { type: Number, default: moment(new Date()).format('X') },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true }
);
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;