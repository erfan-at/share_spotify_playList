const user = require('./profile')
const admin = require('./admin/index')
const auth = require('./auth/index')
module.exports = { user, admin, auth }



const post = require('./post')
const playList = require('./playList')
const comment = require('./comment')
const profile = require('./profile')

module.exports = { post, playList, comment, profile }