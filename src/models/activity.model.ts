import mongoose  from "mongoose";
import moment from "jalali-moment";

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    endPoint: { type: String, required: true },
    // ip: { type: String, required: true },
    // method: { type: String, required: true, enum: ["", ""] },
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
export  {Activity}