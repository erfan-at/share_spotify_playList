const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    endPoint: String,
    body: String,
    date: Number,
    softDelete: Boolean
},
    { timestamps: true }
);
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;