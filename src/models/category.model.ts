import mongoose  from "mongoose";
import moment from "jalali-moment";
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // category: {
    //     type: String, enum: ['football', 'popular', 'Volleyball', 'basketball', 'wrestling', 'handball', 'tennis', 'other', 'CarRacing', 'skate', 'badminton', 'WheelchairBasketball',
    //         'boxing', 'bowling', 'baseball', 'pool', 'taekwondo', 'tableTennis', 'shooting']
    // },
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
const Category = mongoose.model('Category', categorySchema);
export {Category};