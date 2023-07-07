import mongoose from "mongoose";
import moment from "jalali-moment";

const playListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    description: String,
    link: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    // tagIds: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    // categoryIds: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    counter: { type: Number, default: 0 },
    // fileIds: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    // shareTelegramChannel: Boolean,
    block: { type: Boolean, default: false },
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
        versionKey: false,
    }
);
const PlayList = mongoose.model('PlayList', playListSchema);
export default PlayList 