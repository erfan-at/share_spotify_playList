import postValidation from './post.validation';
// const commentValidation = require('./comment.validation')
import playListValidation from './playList.validation';
import userProfieValidation from './userProfile.validate';
import auth from './auth.validation';
// module.exports = { postValidation, commentValidation, playListValidation, userProfieValidation }
export default { userProfieValidation, postValidation, playListValidation, auth };
