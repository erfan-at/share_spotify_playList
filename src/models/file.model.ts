import mongoose from "mongoose";
import moment from "jalali-moment";

const fileSchema = new mongoose.Schema({
    name: String,
    description: String,
    size: String,
    type: String,
    showName: String,
    rawUrl: String,
    url: String,
    status: String,
    typee: { type: String, enum: ["avatar", "playList", "post", "postCover"] },
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
const File = mongoose.model('File', fileSchema);
export { File };

