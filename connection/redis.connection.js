const Redis = require('ioredis')
const appConfig = require('./../application');


const redis = new Redis(appConfig.redis);

redis.on('error', (error) => {
    console.error(`Redis Client error ${error}`);
});

module.exports = { redis }