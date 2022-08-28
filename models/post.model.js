const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    like: Number,
    date: Number,
    userLikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    authorId: { type: mongoose.Types.ObjectId, ref: 'User' },
    tags: Array,
    // category: {
    //     type: String, enum: ['football', 'popular', 'Volleyball', 'basketball', 'wrestling', 'handball', 'tennis', 'other', 'CarRacing', 'skate', 'badminton', 'WheelchairBasketball',
    //         'boxing', 'bowling', 'baseball', 'pool', 'taekwondo', 'tableTennis', 'shooting']
    // },
    counter: { type: Number, default: 0 },
    controversial: Boolean,
    fileIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    isVideo: Boolean,
    slider: Boolean,
    videoLink: String,
    softDelete: Boolean,
},
    { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;