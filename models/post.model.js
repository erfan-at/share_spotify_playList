const mongoose = require('mongoose');
const moment = require("jalali-moment");
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    like: { type: Number, default: 0 },
    userLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    tags: { type: Array, required: true },
    // category: {
    //     type: String, enum: ['football', 'popular', 'Volleyball', 'basketball', 'wrestling', 'handball', 'tennis', 'other', 'CarRacing', 'skate', 'badminton', 'WheelchairBasketball',
    //         'boxing', 'bowling', 'baseball', 'pool', 'taekwondo', 'tableTennis', 'shooting']
    // },

    // tagId: { type: mongoose.Types.ObjectId, ref: 'Tag', required: true },
    // categoryId: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    counter: { type: Number, default: 0 },
    fileIds: [{ type: mongoose.Types.ObjectId, ref: 'File' }],
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
        versionKey: false
    }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;