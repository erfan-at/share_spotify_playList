const appConfig = require('../config/application');
const Redis = require("ioredis");
const redisClient = new Redis(appConfig.Redis);
console.log('======> appConfig.redis: ', JSON.stringify(appConfig.redis));

module.exports = { redisClient }