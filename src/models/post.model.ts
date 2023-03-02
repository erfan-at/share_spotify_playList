import mongoose, { Document } from "mongoose";
import moment from "jalali-moment";


export default interface Post extends Document {
    title: string;
    body: string;
    description: string,
    authorId: string,
    tagIds: string
    categoryIds: string,
    counter: number
    fileIds: string,
    isVideo: Boolean
    slider: Boolean
    videoLink: String,
    block: Boolean
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
    softDelete: Boolean,
    strictPopulate: any
}


const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    // tagIds: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    // categoryIds: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    counter: { type: Number, default: 0 },
    // fileIds: [{ type: mongoose.Types.ObjectId, ref: 'File' }],
    isVideo: { type: Boolean, default: false },
    slider: { type: Boolean, default: false },
    videoLink: String,
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
        strictPopulate: false,
        versionKey: false
    }
);
mongoose.set("strictPopulate", false)
// const Post = mongoose.model<Post>('Post', postSchema);
const Post = mongoose.model('Post', postSchema);
export { Post };


