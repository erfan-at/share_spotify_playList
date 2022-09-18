const cache = require('../connection/redis.connection')
const appConfig = require('../config/application')
const cryptography = require("./cryptography.js")

module.exports = {
    put: async (key, value, timeout = null) => {
        try {
            await cache.client.set(key, JSON.stringify(value));
            if (timeout) { await this.setExpire(key, timeout) }
        } catch (e) { console.error(`ERROR_009 => ${e}`) }
    },
    get: async (key) => {
        try {
            const data = await cache.client.get(key);
            return JSON.parse(data);
        } catch (e) { console.error(`ERROR_010 => ${e}`) }
    },

    getByPattern: async (pattern) => {
        try {
            const data = await cache.client.keys(pattern);
            return JSON.parse(cryptography.base64.decode(await this.get(data[0])))
            // return JSON.parse(data);
        } catch (e) { console.error(`ERROR_010 => ${e}`) }
    },

    getPendingRequestsByKey: async (key) => {
        try {
            const data = await this.get(key);
            const stream = cache.client.scanStream({
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
    },

    setExpire: async (key, value) => {
        try {
            await cache.redis.expire(key, value);
        } catch (e) { console.error(`ERROR_013 => ${e}`) }
    }
}
