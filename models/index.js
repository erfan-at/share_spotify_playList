'use strict'
const User = require('./user.model')
const Activity = require('./activity.model')
const Comment = require('./comment.model')
const Contact = require('./contact.model')
const File = require('./file.model')
const Notification = require('./notification.model')
const Option = require('./options.model')
const Playlist = require('./playList.model')
const Post = require('./post.model')
const Pivot = require("./postPlayListUserPivot.model")

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
    Pivot
}