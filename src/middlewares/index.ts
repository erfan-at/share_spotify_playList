import auth from './authentication.middleware';
import checkUser from './checkUser.middleware';
import recordActivityMiddleware from './recordActivity.middleware';
export default { auth, checkUser, recordActivityMiddleware };
