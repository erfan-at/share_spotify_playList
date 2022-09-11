const cache = require('../connection/redis.connection')

// const appConfig = require('../../config/application')
const cryptography = require("./cryptography.js")





class Redis {
    static async put(key, value, timeout = null) {
        try {
            cache.redis.set(key, JSON.stringify(value));
            if (timeout) { await this.setExpire(key, timeout) }
        } catch (e) { console.error(`ERROR_009 => ${e}`) }
    }

    static async get(key) {
        try {
            const data = await cache.redis.get(key);
            return JSON.parse(data);
        } catch (e) { console.error(`ERROR_010 => ${e}`) }
    }


    static async getByPattern(pattern) {
        try {
            const data = await cache.redis.keys(pattern);
            return JSON.parse(cryptography.base64.decode(await this.get(data[0])))
            // return JSON.parse(data);
        } catch (e) { console.error(`ERROR_010 => ${e}`) }
    }



    static async getPendingRequestsByKey(key) {
        try {
            const data = await this.get(key);
            const stream = cache.redis.scanStream({
                match: `${data.username + appConfig.request.pendingPrefix}*`,
            });
            stream.on('data', (keys) => {
                if (keys.length) {
                    console.info(keys);
                    // const pipeline = cache.redis.pipeline();
                    keys.forEach(async (key) => {
                        const req = JSON.parse(await this.get(key));
                        console.info(req.cache);
                    });
                    // pipeline.exec();
                }
            });
            return data.username;
        } catch (e) { console.error(`ERROR_011 => ${e}`) }
    }



    static async setExpire(key, value) {
        try {
            await cache.redis.expire(key, value);
        } catch (e) { console.error(`ERROR_013 => ${e}`) }
    }
}

module.exports = Redis;