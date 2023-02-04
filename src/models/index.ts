'use strict'
const User = require('./user.model')
const Post = require('./post.model')
const Playlist = require('./playList.model')
const Comment = require('./comment.model')
const File = require('./file.model')
const Notification = require('./notification.model')
const Activity = require('./activity.model')
const Option = require('./options.model')
const Contact = require('./contact.model')
const postLike = require('./postLike.model')
const postSave = require('./postSave.model')
const playListSave = require("./playListSave.model")
const playListLike = require("./playListLike.model")


module.exports = {
    User,
    Activity,
    Comment,
    Contact,
    File,
    Notification,
    Option,
    Playlist,
    Post,
    postLike,
    postSave,
    playListSave,
    playListLike
}