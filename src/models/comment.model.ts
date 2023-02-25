import mongoose from "mongoose";
import moment from "jalali-moment";

const commentSchema = new mongoose.Schema({
    username: String,
    text: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    playListId: { type: mongoose.Types.ObjectId, ref: 'PlayList' },
    // accepted: Boolean,
    email: String,
    mobile: String,
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
const Comment = mongoose.model('Comment', commentSchema);

export { Comment };