const mongoose = require('mongoose');
const moment = require("jalali-moment");
const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    endPoint: { type: String, required: true },
    body: String,
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
)
    ;
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
